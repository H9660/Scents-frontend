import { Table } from "@chakra-ui/react";
import { TablesProps } from "@/slices/types";
const Tables = ({ cart, total }: TablesProps)=> {
  return (
<div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
  <div className="w-full max-w-4xl">
    {/* Conditional Rendering Based on Screen Size */}
    <div className="hidden md:grid md:grid-cols-2 gap-6">
      {/* First Half */}
      <Table.Root size="lg" variant="outline" stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Quantity</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(cart)
            .slice(0, Math.ceil(Object.entries(cart).length / 2))
            .map(([ele, idx]) => (
              <Table.Row key={ele}>
                <Table.Cell>{ele}</Table.Cell>
                <Table.Cell textAlign="end">₹ {idx.price}</Table.Cell>
                <Table.Cell textAlign="end">{idx.quantity}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>

      {/* Second Half */}
      <Table.Root size="lg" variant="outline" stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Quantity</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(cart)
            .slice(Math.ceil(Object.entries(cart).length / 2))
            .map(([ele, idx]) => (
              <Table.Row key={ele}>
                <Table.Cell>{ele}</Table.Cell>
                <Table.Cell textAlign="end">₹ {idx.price}</Table.Cell>
                <Table.Cell textAlign="end">{idx.quantity}</Table.Cell>
              </Table.Row>
            ))}

          {/* Subtotal Row */}
          <Table.Row border="1px solid gray">
            <Table.Cell textAlign="start">Subtotal:</Table.Cell>
            <Table.Cell textAlign="end" colSpan={2}>
              ₹ {total}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>

    {/* Combined Table for Small Screens */}
    <div className="block md:hidden">
      <Table.Root size="lg" variant="outline" stickyHeader>
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

          {/* Subtotal Row */}
          <Table.Row border="1px solid gray">
            <Table.Cell textAlign="start">Subtotal:</Table.Cell>
            <Table.Cell textAlign="end" colSpan={2}>
              ₹ {total}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</div>
  );
};

export default Tables
