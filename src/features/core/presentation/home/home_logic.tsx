"use client";

import { useSampleService } from "@/shared/dependency_injection/global_container";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { StateModel, StateType } from "@/shared/domain/model/state_model";
import { SamplePhotoResponse } from "../../domain/model/response/sample/sample_photo_response";

interface HomeContextProps {
  // presidentState: StateModel<SamplePresidentResponse[]>;
  photoState: StateModel<SamplePhotoResponse[]>;
}

const HomeLogic = createContext<HomeContextProps | undefined>(undefined);
// const includeBanner = ["/"];
export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const service = useSampleService();
  // const [presidentState, setPresidentState] = useState<
  //   StateModel<SamplePresidentResponse[]>
  // >({
  //   data: [],
  //   type: StateType.initial,
  //   message: "",
  // });
  const [photoState, setPhotoState] = useState<
    StateModel<SamplePhotoResponse[]>
  >({
    data: [],
    type: StateType.initial,
    message: "",
  });
  // const getListPresident = useCallback(async (): Promise<void> => {
  //   const res = await service.getListPresident();
  //   res.fold(
  //     (err) => {
  //       console.log(`error : `, err);
  //       setPresidentState({
  //         data: [],
  //         type: StateType.error,
  //         message: err.message,
  //       });
  //     },
  //     (data) => {
  //       console.log(`data : `, data.length);

  //       setPresidentState({
  //         data,
  //         type: StateType.success,
  //         message: "",
  //       });
  //     },
  //   );
  // }, [service]);
  const getListPhoto = useCallback(async (): Promise<void> => {
    const res = await service.getListPhoto();
    res.fold(
      (err) => {
        console.log(`error : `, err);
        setPhotoState({
          data: [],
          type: StateType.error,
          message: err.message,
        });
      },
      (data) => {
        // console.log(`data : `, data.length);

        setPhotoState({
          data,
          type: StateType.success,
          message: "",
        });
      },
    );
  }, [service]);
  useEffect(() => {
    // getListPresident();
    getListPhoto();
  }, [getListPhoto]);
  return (
    <HomeLogic.Provider value={{ photoState }}>{children}</HomeLogic.Provider>
  );
};

export const useHomeLogic = () => {
  const context = useContext(HomeLogic);
  if (!context) {
    throw new Error("useHomeLogic must be used within HomeProvider");
  }
  return context;
};
