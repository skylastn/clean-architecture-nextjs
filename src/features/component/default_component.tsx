import FooterComponent from "@/features/component/footer";
import HeaderComponent from "@/features/component/header";

interface DefaultComponentProps {
  component: React.ReactNode;
}

export default function DefaultComponent({ component }: DefaultComponentProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#171c28]">
      <HeaderComponent />
      <main className="mx-auto w-full flex-1 pt-24 p-5">{component}</main>
      <FooterComponent />
    </div>
  );
}
