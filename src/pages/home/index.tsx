import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { CreateOrderModal } from "../../components/createOrderModal";
import { useAppSelector } from "../../store";

export const Home = () => {
  const isProvider = useAppSelector(state => state.user.isProvider);
  const [modalOpen, setModalOpen] = useState(false);

  const createOrder = () => {
    setModalOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Necessita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          <IonCard onClick={createOrder} style={{cursor: "pointer"}}>
            <IonCardHeader>
              <IonCardTitle>Abrir um chamado</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Clique aqui para criar um novo pedido.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink="orders" routerDirection="forward">
            <IonCardHeader>
              <IonCardTitle>Acesse seus pedidos</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Clique aqui para ir até seus pedidos.
            </IonCardContent>
          </IonCard>
          { isProvider && (
            <>
              <IonCard routerLink="find-orders" routerDirection="forward">
                <IonCardHeader>
                  <IonCardTitle>Encontre Serviços</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Clique aqui para encontrar serviços.
                </IonCardContent>
              </IonCard>
              <IonCard routerLink="applied-orders" routerDirection="forward">
                <IonCardHeader>
                  <IonCardTitle>Acesse seus serviços aplicados</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Clique aqui para ir até seus serviços aplicados.
                </IonCardContent>
              </IonCard>
            </>
          )}
        </div>
        <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)}/>
      </IonContent>
    </IonPage>
  );
};
