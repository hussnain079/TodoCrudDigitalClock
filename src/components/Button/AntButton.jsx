import { Button } from "antd";

const AntButton = ({ name, type, size, shape, htmlType, onClick, icon }) => {

  return (
    <Button
      type={type}
      size={size}
      shape={shape}
      htmlType={htmlType}
      onClick={onClick}
      icon={icon}
    >{name} </Button>
  );
};

export default AntButton;
