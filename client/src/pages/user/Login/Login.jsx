import { GoogleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../../firebase/configFireBase";

export default function Login() {
  const navigate = useNavigate();
  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const userLocal = {
          email: response.user.email,
          userName: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid,
        };
        //lưu thông tin lên userLocal
        localStorage.setItem("userlocal", JSON.stringify(userLocal));
        //chuyển hướng về trang home
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <form>
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-md shadow-2xl shadow-slate-400 w-96">
              <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <Input
                    status="error"
                    name="email"
                    className="w-full px-3 py-2 rounded"
                    placeholder="Nhập email của bạn"
                  />
                  <p className="text-red-600">Không đc để trống!</p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Mật khẩu:
                  </label>
                  <Input
                    name="password"
                    status="error"
                    className="w-full px-3 py-2 rounded"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                  <p className="text-red-600">Không đc để trống!</p>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-700"
                  >
                    Đăng nhập
                  </Button>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-500 text-sm"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={signWithGoogle}
                    className="bg-blue-100 hover:bg-blue-300 border-dashed border-blue-500 text-blue-950 mt-6 flex items-center"
                  >
                    <GoogleOutlined className="text-xl h-8 text-yellow-400" />
                    Đăng nhập với google
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-base">
                    Bạn chưa có tài khoản?{" "}
                    <Link className="text-blue-600">Đăng kí</Link>
                  </p>
                </div>
                <div className="flex justify-center align-center mt-8">
                  <Button>
                    <p>Quay lại trang chủ</p>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
