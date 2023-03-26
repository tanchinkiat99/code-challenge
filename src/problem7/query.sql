SELECT B.address AS address
FROM balances B
WHERE EXISTS (
    SELECT 1
    FROM trades T
    WHERE B.address = T.address AND T.block_height > 730000
)
GROUP BY B.address
HAVING (
    0.000001 * SUM(
        SELECT B1.amount
        FROM balances B1
        WHERE B1.address = B.address AND B1.denom = usdc
    ) + 0.00000005 * SUM(
        SELECT B1.amount
        FROM balances B1
        WHERE B1.address = B.address AND B1.denom = swth
    ) + 0.003 * SUM(
        SELECT B1.amount
        FROM balances B1
        WHERE B1.address = B.address AND B1.denom = tmz
    )
) > 500;