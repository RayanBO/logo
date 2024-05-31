// src/LoginPage.js
import React, { useState } from "react";
import { Form, Input, Button,  notification } from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LoginOutlined,
} from "@ant-design/icons";
import { authenticateUser } from "../components/Db";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function Login({ onLoginSuccess }) {
    const [loading, setLoading] = useState(false);

    const showToastMessage = (type, message) => {
        notification[type]({
            message: type === "error" ? "Erreur" : "Succès",
            description: message,
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { isAuthenticated, userData } = await authenticateUser(
                values.login,
                values.password,
                showToastMessage
            );
            if (isAuthenticated) {
                onLoginSuccess(userData);
                showToastMessage("success", "Connexion réussie");
            }
        } catch (error) {
            showToastMessage("error", `Erreur d'authentification: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                style={{ maxWidth: "300px", width: "100%" }}
            >
                <Form.Item>
                    <div
                        style={{
                            textAlign: "center",
                            width: "max-content",
                            fontSize: "36px",
                            fontFamily: "monospace",
                            fontWeight: "bolder"
                        }}
                    >
                        LOGO
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "16px",
                            width: "max-content",
                            color: "rgba(0,0,0,.5)"
                        }}
                    >
                        Bienvenue sur l'application
                    </div>
                </Form.Item>
                <Form.Item
                    name="login"
                    rules={[
                        { required: true, message: "Veuillez entrer votre identifiant!" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        style={{ fontSize: "16px" }}
                        placeholder="Identifiant"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Veuillez entrer votre mot de passe!" },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{ fontSize: "16px" }}
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        icon={<LoginOutlined />}
                        size="large"
                        style={{ width: "100%" }}
                        loading={loading}
                    >
                        Se connecter
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
