import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";


export const FindOrders = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meus Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container" onScroll={() => null}>
          <h1>find orders works</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};
