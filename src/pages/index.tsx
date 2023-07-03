import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

import { AuthContext } from "@/context/AuthContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code;

  if (!code) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      code,
    },
  };
};

interface HomePageProps {
  code: string;
}

export default function HomePage({ code }: HomePageProps) {
  const { accessToken, login } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      login(code);
      return;
    }
  }, [accessToken]);

  return <div>HomePage</div>;
}
