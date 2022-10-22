import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { mockOrders, useListOrdersQuery } from "../../services/order/order.service";
import { Order } from "../../services/order/types";
import { ServiceBR, StatusBR } from "../../utils/constants";

const multiplyMock = (qtd: number) => {
  let returnedMock: Order[] = [];
  for (let index = 0; index < qtd; index++) {
    returnedMock = returnedMock.concat(mockOrders);
  }
  return returnedMock
};


export const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>(multiplyMock(5))
  const { data, isLoading } = useListOrdersQuery(page);

  if(isLoading) {
    return (
      <LoadingComponent />
    );
  }
  console.log("orders ", orders);
  
  if(data?.length) {
    setOrders(oldOrders => [...oldOrders, ...data]);
  }

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
          { orders?.map(order => (
            <IonCard key={order.id} onClick={() => null}>
              <IonCardHeader>
                <IonCardSubtitle>{StatusBR[order.status]}</IonCardSubtitle>
                <IonCardTitle>{order.title}</IonCardTitle>
                <IonCardSubtitle>{ServiceBR[order.service]}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Endereço: {order.address}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

const LoadingComponent = () => {
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
        <h3>Loading...</h3>
      </IonContent>
    </IonPage>
  );
}
