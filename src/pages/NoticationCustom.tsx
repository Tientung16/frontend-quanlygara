import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Tooltip } from "antd";
import React, { useRef } from "react";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = "top" | "bottom" | "bottomLeft" | "bottomRight" | "topLeft" | "topRight"

interface Props {
    type: NotificationType;
    message: string;
    description: string;
    onAccept: () => void;
    onCancel: () => void;
    textOK?: string;
    textCancel?: string;
    icon: React.ReactNode;
    keyProp: string;
    style?: any;
    titleTooltip?: string;
    className?: string;
    danger?: boolean;
    disabled?: boolean;
}
const Notification = ({ description, onAccept, onCancel, icon, style = {}, titleTooltip, className, textOK, textCancel, danger = true, disabled = false }: Props) => {
    const openNotification = () => {
        const handCancel = () => {
            onCancel();
        }
        const handAccept = () => {
            onAccept()
        }
        const warning = () => {
            Modal.confirm({
                title: 'Thông báo',
                content: <div>
                    <Row gutter={[16, 16]} className="mg-8">
                        {description}
                    </Row>
                </div>,
                okButtonProps: {},
                cancelButtonProps: {},
                onOk() {
                    handAccept()
                },
                onCancel() {
                    handCancel()
                },
                okText: textOK,
                cancelText: textCancel,
            });
        };

        warning()
    };
    const buttonRef = useRef(null);
    const callBack = () => {
        openNotification()
    }
    return (
        <>
            <Tooltip placement="top" title={titleTooltip}>
                <Button
                    onClick={callBack}
                    style={style}
                    // className={className}
                    disabled={disabled}
                    type="primary"
                    danger={danger}
                    shape="circle"
                    icon={icon} />
            </Tooltip>
            <div className="notification-custom-center" ref={buttonRef} />
        </>
    );
};

export default Notification;