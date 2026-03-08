import DefaultComponent from "@/features/component/default_component";
import { HomeProvider } from "@/features/core/presentation/home/home_logic";
import HomeUI from "@/features/core/presentation/home/home_ui";

export default function Home() {
  return (
    <div>
      <DefaultComponent
        component={
          <HomeProvider>
            <HomeUI />
          </HomeProvider>
        }
      ></DefaultComponent>
    </div>
  );
}
