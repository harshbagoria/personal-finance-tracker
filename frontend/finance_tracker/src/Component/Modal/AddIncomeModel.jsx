
import { Form, Input, InputNumber, Select, DatePicker, Modal, Button } from "antd";

function AddIncomeModal({ open, onClose, onAddIncome }) {

  const [form] = Form.useForm();

  const handleSubmit = (values) => {

    const incomeData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      type: "income"
    };

    // Send income data to Dashboard
    onAddIncome(incomeData);

    // Clear form and close modal
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Income"
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
    >

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        {/* Income Title */}
        <Form.Item
          label="Income Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter income title"
            }
          ]}
        >
          <Input placeholder="e.g. Monthly Salary" />
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label="Amount (₹)"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please enter income amount"
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

        {/* Income Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select income category"
            }
          ]}
        >
          <Select placeholder="Select income category">
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="Business">Business</Select.Option>
            <Select.Option value="Investment">Investment</Select.Option>
            <Select.Option value="Gift">Gift</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Date Received"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select income date"
            }
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select income date"
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
            <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            <Select.Option value="Cheque">Cheque</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
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

            <Button onClick={handleCancel}>
              Cancel
            </Button>

            <Button onClick={onAddIncome} type="primary" htmlType="submit">
              Add Income
            </Button>

          </div>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
