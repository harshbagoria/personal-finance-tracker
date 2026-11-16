
import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button
} from "antd";

function AddExpenseModal({ open, onClose, onAddExpense }) {

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const expenseData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      type: "expense"
    };

    onAddExpense(expenseData);

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Expense"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        {/* Expense Title */}
        <Form.Item
          label="Expense Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter expense title"
            }
          ]}
        >
          <Input placeholder="e.g. Grocery Shopping" />
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label="Amount (₹)"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please enter amount"
            }
          ]}
        >
          <InputNumber
            placeholder="Enter amount"
            min={0.01}
            precision={2}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select category"
            }
          ]}
        >
          <Select placeholder="Select category">
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Shopping">Shopping</Select.Option>
            <Select.Option value="Transport">Transport</Select.Option>
            <Select.Option value="Bills">Bills</Select.Option>
            <Select.Option value="Health">Health</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select date"
            }
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select expense date"
          />
        </Form.Item>

        {/* Payment Method */}
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Please select payment method"
            }
          ]}
        >
          <Select placeholder="Select payment method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="UPI">UPI</Select.Option>
            <Select.Option value="Debit Card">Debit Card</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="Net Banking">Net Banking</Select.Option>
          </Select>
        </Form.Item>

        {/* Notes */}
        <Form.Item
          label="Notes"
          name="notes"
        >
          <Input.TextArea
            rows={3}
            placeholder="Add additional notes (optional)"
          />
        </Form.Item>

        {/* Buttons */}
        <Form.Item>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px"
          }}>
            <Button onClick={() => {
              form.resetFields();
              onClose();
            }}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Add Expense11
            </Button>
          </div>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
