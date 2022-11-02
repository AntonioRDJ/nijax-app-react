import { IonSpinner } from "@ionic/react";

export const LoadingComponent = () => {
  return (
    <div style={{
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <IonSpinner style={{height: "50px", width: "50px"}}></IonSpinner>
    </div>
  );
};
