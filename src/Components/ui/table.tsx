import { Table } from "@chakra-ui/react";
export const Tables = ({ cart, total }) => {
  return (
    <Table.Root size="lg" variant="outline" stickyHeader>
        <>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Quantity</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.entries(cart).map(([ele, idx]) => (
              <Table.Row key={ele}>
                <Table.Cell>{ele}</Table.Cell>
                <Table.Cell textAlign="end">₹ {idx.price}</Table.Cell>
                <Table.Cell textAlign="end">{idx.quantity}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row border="1px solid gray">
              <Table.Cell textAlign="start" >Subtotal:</Table.Cell>
              <Table.Cell textAlign="end">₹ {total}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </>
    </Table.Root>
  );
};
