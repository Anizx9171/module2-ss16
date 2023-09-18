import React from "react";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal, notification } from "antd";

export default function Headerr() {
  // lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userlocal"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    notification.success({ message: "Đăng xuất thành công" });
    navigate("/sign-in");
  };
  const handleConfirmLogOut = () => {
    Modal.confirm({
      title: "Cảnh báo",
      content: "Bạn có muốn đăng xuất?",
      onOk() {
        handleLogOut();
      },
      onCancel() {},
      cancelText: "Hủy bỏ",
      okText: "Đăng xuất",
    });
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <UserOutlined className="mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/change-password">
          <KeyOutlined className="mr-2" />
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={handleConfirmLogOut}>
          <LogoutOutlined className="mr-2" />
          Đăng xuất
        </a>
      ),
    },
  ];
  return (
    <>
      <div className="w-full bg-orange-500 h-14 text-white flex align-center items-center justify-between px-5">
        <div className="flex gap-4 items-center">
          <NavLink>Shopee</NavLink>
          <NavLink>Trang chủ</NavLink>
          <NavLink>Sản phẩm</NavLink>
          <NavLink>
            <ShoppingCartOutlined className="text-2xl" />
          </NavLink>
          <span className="bg-white px-2 rounded-xl text-black relative right-5 bottom-3">
            2
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <NavLink to="/about">Giới thiệu</NavLink>
          <NavLink to="/contact">Liên hệ</NavLink>
          {userLogin == null ? (
            <>
              <NavLink to="/sign-up">Đăng kí</NavLink>
              <NavLink to="/sign-in">Đăng nhập</NavLink>
            </>
          ) : (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Button className="flex items-center gap-2 border-none shadow-none text-white">
                <img
                  src={userLogin.image}
                  className="rounded-full"
                  width="25"
                  height="25"
                />
                {userLogin.userName}
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}
