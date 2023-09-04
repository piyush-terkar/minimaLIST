import {
  Avatar,
  Text,
  Button,
  Paper,
  useMantineTheme,
  Container,
  SimpleGrid,
  Title,
  Center,
  Divider,
  Stack,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { HeaderMenu } from "../partials/HeaderMenu";
import { IconAlertTriangleFilled, IconArrowLeft } from "@tabler/icons-react";
import { IconLogout2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { notifications } from "@mantine/notifications";
import { IconHandStop } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { FooterPlain } from "../partials/FooterPlain";
import { modals } from "@mantine/modals";

export function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const theme = useMantineTheme();
  const logout = () => {
    axiosInstance.post("api/auth/logout").then((response) => {
      secureLocalStorage.clear();
      notifications.show({
        title: "Bye Bye!",
        color: "yellow",
        icon: <IconHandStop />,
      });
      navigate("/login");
    });
  };

  const deleteAccount = (userId) => {
    axiosInstance.delete(`/api/v1/user/${userId}`).then((resonse) => {
      logout();
    });
  };

  useEffect(() => {
    axiosInstance.get("/api/v1/user").then((response) => {
      setUser({ ...response.data });
    });
  }, []);

  const deleteModal = (userId) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        deleteAccount(userId);
      },
    });
  };

  const handleSubmit = () => {};

  return (
    <>
      <HeaderMenu theme={theme} />
      {user ? (
        <>
          <Container mt={"xl"}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <Center m={"lg"}>
                <Title>Welcome to your account, {user.username} !</Title>
              </Center>
              <Avatar
                size={120}
                radius={120}
                mx="auto"
                m={"lg"}
                color={"yellow"}
                variant={"filled"}
              >
                {user.username[0]}
              </Avatar>
              <Text ta="center" fz="lg" weight={500} mt="md">
                {user.username}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {user.email}
              </Text>
              <SimpleGrid cols={3} spacing="lg">
                <Button
                  variant="light"
                  mt={"md"}
                  onClick={() => {
                    navigate("/todolist");
                  }}
                  leftIcon={<IconArrowLeft />}
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  mt="md"
                  onClick={() => {
                    logout();
                  }}
                  leftIcon={<IconLogout2 />}
                >
                  Logout
                </Button>
                <Button
                  variant={"outline"}
                  mt="md"
                  color={"red"}
                  onClick={() => {
                    deleteModal(user.id);
                  }}
                >
                  Delete Account
                </Button>
              </SimpleGrid>
            </Paper>
          </Container>
          <Divider m={"lg"}></Divider>
          <Container mt={"lg"}>
            <Title>Edit User Details</Title>
            <Text c={"dimmed"}>
              {" "}
              Use this Section to edit your basic details!
            </Text>
            <Paper>
              <form>
                <Stack>
                  <TextInput
                    defaultValue={user.username}
                    withAsterisk
                    label="Name"
                    placeholder="Your name"
                    radius="md"
                  />

                  <TextInput
                    defaultValue={user.email}
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    radius="md"
                  />
                </Stack>
                <Button fullWidth my={"md"} variant={"light"} color={"green"}>
                  Save Changes
                </Button>
              </form>
            </Paper>
            <Divider m={"lg"}></Divider>
            <Title>Change Password</Title>
            <Text c={"dimmed"}> Don't Forget it!</Text>
            <Paper>
              <form>
                <Stack>
                  <PasswordInput
                    withAsterisk
                    label="New Password"
                    radius="md"
                  />

                  <PasswordInput
                    withAsterisk
                    required
                    label="Confirm Password"
                    radius="md"
                  />
                </Stack>
                <Button fullWidth my={"md"} variant={"outline"} color={"blue"}>
                  Change Password
                </Button>
              </form>
            </Paper>
          </Container>
        </>
      ) : null}
      <FooterPlain />
    </>
  );
}
