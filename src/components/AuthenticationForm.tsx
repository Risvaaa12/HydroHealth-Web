import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { app, storage } from "../../firebaseConfig";
import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Link,
  Input,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


export default function AuthenticationForm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const auth = getAuth(app);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [photoProfile, setPhotoProfile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const afterAuth = "/monitoring";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData: firebase.User | null) => {
      setUser(userData);
    });
    return () => unsubscribe();
  }, [auth]);
  
  
  
  
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push(afterAuth);
    } catch (error: any) {
      console.error("Error signing in with Google", error.message);
      setError("Error signing in with Google. Please try again.");
    }
  };
  
  const handleSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.reload();
      setTimeout(() => {
        router.push(afterAuth);
      }, 500);
    } catch (error: any) {
      console.error("Error signing in with email and password", error.message);
      setError("Email atau password salah. Silakan coba lagi!");
    }
  };
  
  const handleSignUpWithEmailAndPassword = async () => {
    try {
      validateForm();
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: fullName });
        if (photoProfile) {
          const storageRef = ref(storage, `user/photoProfile/${currentUser.uid}`);
          await uploadBytes(storageRef, photoProfile);
          const downloadURL = await getDownloadURL(storageRef);
          await updateProfile(currentUser, { photoURL: downloadURL });
        }
      }
      router.reload();
      setTimeout(() => {
        router.push(afterAuth);
      }, 500);
    } catch (error: any) {
      console.error("Error signing up with email and password", error.message);
      setError(error.message);
    }
  };
        

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      try {
        validatePhoto(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewUrl(reader.result as string);
          }
        };
        reader.readAsDataURL(selectedFile);
        setPhotoProfile(selectedFile);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const validateForm = () => {
    if (!validateName(fullName)) {
      throw new Error("Nama tidak boleh mengandung karakter selain abjad!");
    }
    if (!validateEmail(email)) {
      throw new Error("Alamat Email tidak valid!");
    }
    if (!validatePassword(password)) {
      throw new Error("Password minimal 8 karakter, mengandung huruf besar dan kecil, angka, serta simbol!");
    }
    if (password !== confirmPassword) {
      throw new Error("Konfirmasi Password Tidak Cocok!");
    }
    if (!photoProfile) {
      throw new Error("Foto profil tidak boleh kosong!");
    }
  };

  const validateName = (name: string): boolean => /^[A-Za-z\s]+$/.test(name);

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const validatePhoto = (file: File): void => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Harap unggah file gambar (png, jpeg, jpg)!");
    }
  };

  return (
    <>
      <Button color="success" variant="flat" onClick={onOpen} className="font-bold" radius="sm">
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur" scrollBehavior="outside" shadow="lg" className="mr-4 ml-4">
        <ModalContent>
          <>
            <div className="text-center">
              <Tabs
                aria-label="Options"
                variant="underlined"
                size="md"
                color="success"
                className="pt-4 font-semibold text-sm"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <ModalHeader className="flex flex-col text-center">
                    <p>Login</p>
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      id="emailLogin"
                      endContent={<EmailIcon color="disabled" />}
                      isRequired
                      label="Email"
                      placeholder="Email"
                      variant="bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      id="passwordLogin"
                      isRequired
                      label="Password"
                      placeholder="Password"
                      variant="bordered"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" /> : <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <div className="flex justify-end">
                      <Link href="/" color="success" className="text-xs">
                        Lupa Password?
                      </Link>
                    </div>
                    <Button color="success" onClick={handleSignInWithEmailAndPassword} className="font-bold">
                      Login
                    </Button>
                    <Divider className="my-4" />
                    <Button onClick={signInWithGoogle} color="success" variant="bordered" className="font-bold">
                      Login dengan Google
                    </Button>
                    <div className="mt-4">
                      <p className="text-xs text-center">
                        Belum memiliki akun?{" "}
                        <Link href="#" color="success" onClick={() => setSelected("signup")}>
                          Daftar di sini
                        </Link>
                      </p>
                    </div>
                  </ModalBody>
                </Tab>
                <Tab key="signup" title="Sign Up">
                  <ModalHeader className="flex flex-col text-center">
                    <p>Daftar</p>
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      id="fullName"
                      isRequired
                      label="Nama Lengkap"
                      placeholder="Nama Lengkap"
                      variant="bordered"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      endContent={<PersonIcon color="disabled" />}
                    />
                    <Input
                      id="emailSignUp"
                      isRequired
                      label="Email"
                      placeholder="Email"
                      variant="bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      endContent={<EmailIcon color="disabled" />}
                    />
                    <Input
                      id="passwordSignUp"
                      isRequired
                      label="Password"
                      placeholder="Password"
                      variant="bordered"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" /> : <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      id="confirmPassword"
                      isRequired
                      label="Konfirmasi Password"
                      placeholder="Konfirmasi Password"
                      variant="bordered"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" /> : <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="mb-2">
                      <input type="file" id="photoProfile" name="photoProfile" accept="image/png, image/jpeg" className="hidden" onChange={handleProfileImageChange} />
                      <label htmlFor="photoProfile" className="cursor-pointer">
                        {previewUrl ? (
                          <Image src={previewUrl} alt="Preview" width={70} height={70} className="rounded-full object-cover" />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            <PersonIcon className="text-gray-400" />
                          </div>
                        )}
                      </label>
                      <div className="flex justify-center mt-2">
                        <Button auto flat color="danger" onClick={() => setPreviewUrl(null)}>
                          <DeleteIcon />
                        </Button>
                      </div>
                      {error && <p className="text-red-500 text-xs">{error}</p>}
                    </div>
                    <Button color="success" onClick={handleSignUpWithEmailAndPassword} className="font-bold">
                      Daftar
                    </Button>
                  </ModalBody>
                </Tab>
              </Tabs>
            </div>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
