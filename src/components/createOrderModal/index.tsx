import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCreateOrderMutation } from "../../services/order/order.service";
import { CreateOrderRequest } from "../../services/order/types";
import { useAppDispatch } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";

const requiredFields = ["title", "description", "service", "address"];

type CreateOrderModalProps = {
  open: boolean;
  onClose: () => void;
}

export const CreateOrderModal = (props: CreateOrderModalProps) => {
  const { open, onClose } = props;
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [service, setService] = useState<Service>();
  const [address, setAddress] = useState<string>();
  // const [radiusDistance, setRadiusDistance] = useState<number>();

  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const [createOrder] = useCreateOrderMutation();

  const handleConfirm = async () => {
    const orderToCreate = {title, description, service, address};
    if(requiredFields.some(key => !orderToCreate[key as keyof typeof orderToCreate])) {
      presentToast({message: "Por favor preencha todos os campos."});
      return;
    }

    try {
      const { data } = await createOrder(orderToCreate as CreateOrderRequest).unwrap();
      presentToast({message: "Pedido criado com sucesso.", color: "success"});
      onClose();
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    }
  };

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Criar um pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList style={{padding: "0 12px", overflow: "hidden"}}>
          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput
              type="text"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Descrição</IonLabel>
            <IonInput
              type="text"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Serviço prestado *</IonLabel>
            <IonSelect placeholder="Selecione" value={service} onIonChange={(e) => setService(e.detail.value)}>
              {Object.entries(ServiceBR).map(([key, value]) => (
                <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Endereço</IonLabel>
            <IonInput
              type="text"
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
            ></IonInput>
          </IonItem>
          {/* <IonItem>
            <IonLabel position="floating">Raio de procura (km)</IonLabel>
            <IonInput
              type="number"
              value={radiusDistance}
              onIonChange={(e) => setRadiusDistance(parseInt(e.detail.value!))}
              max={150}
              min={10}
            ></IonInput>
          </IonItem> */}
        </IonList>
      </IonContent>
      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons style={{ justifyContent: "center" }}>
            <IonButton shape="round" onClick={handleConfirm}>
              Confirmar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};