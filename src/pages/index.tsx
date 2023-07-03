import { GetServerSideProps } from "next";

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
  return <div>HomePage</div>;
}
