import React, { useState } from "react";
import { Button, Modal } from "antd";

type TModel = {
  buttonText: string;
  children?: React.ReactNode;
};

const CustomModal: React.FC<TModel> = ({ children, buttonText }: TModel) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        title="ChangeLog"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
