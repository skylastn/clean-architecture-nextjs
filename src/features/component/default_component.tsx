import FooterComponent from "@/features/component/footer";
import HeaderComponent from "@/features/component/header";
import { useGlobalLogic } from "@/shared/logic/global_logic";

interface DefaultComponentProps {
  component: React.ReactNode;
}

export default function DefaultComponent({ component }: DefaultComponentProps) {
  const { bgColor } = useGlobalLogic();

  return (
    <div className={`min-h-screen flex flex-col ${bgColor}`}>
      <HeaderComponent />
      <main className="mx-auto w-full flex-1 p-5 pt-10">{component}</main>
      <FooterComponent />
    </div>
  );
}
