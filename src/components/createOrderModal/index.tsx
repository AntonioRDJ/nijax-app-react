import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCreateOrderMutation } from "../../services/order/order.service";
import { CreateOrderRequest } from "../../services/order/types";
import { Address } from "../../services/viacep/types";
import { useLazyGetAddressQuery } from "../../services/viacep/viacep.service";
import { useAppDispatch } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";
import { validateCep } from "../../utils/validations";

const requiredFields = ["title", "description", "service", "address", "cep", "number"];

type CreateOrderModalProps = {
  open: boolean;
  onClose: () => void;
}

export const CreateOrderModal = (props: CreateOrderModalProps) => {
  const { open, onClose } = props;
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [service, setService] = useState<Service>();
  const [cep, setCep] = useState<string>();
  const [number, setNumber] = useState<string>();

  const [address, setAddress] = useState<Address>();
  // const [radiusDistance, setRadiusDistance] = useState<number>();

  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const [createOrder] = useCreateOrderMutation();
  const [getAddress] = useLazyGetAddressQuery();

  const handleConfirm = async () => {
    let orderToCreate: any = {title, description, service, cep, number, address};
    if(requiredFields.some(key => !orderToCreate[key as keyof typeof orderToCreate])) {
      presentToast({message: "Por favor preencha todos os campos."});
      return;
    }

    orderToCreate = {
      ...orderToCreate,
      ...orderToCreate.address,
    }
    delete orderToCreate.address;

    try {
      const { data } = await createOrder(orderToCreate as CreateOrderRequest).unwrap();
      presentToast({message: "Pedido criado com sucesso.", color: "success"});
      onClose();
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    }
  };

  const handleBlurCep = async () => {
    if(!validateCep(cep)) {
      return
    }
    try {
      const data = await getAddress(cep!).unwrap();

      if(data.erro) {
        return presentToast({message: "Cep não encontrado.", color: "warning"});
      }

      setAddress({
        cep: data.cep,
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
      
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados do cep informado.", color: "danger"});
    }
  }

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
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              autoGrow={true}
            ></IonTextarea>
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
            <IonLabel position="floating">CEP</IonLabel>
            <IonInput
              type="text"
              value={cep}
              onIonChange={(e) => setCep(e.detail.value!)}
              onIonBlur={handleBlurCep}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Logradouro</IonLabel>
            <IonInput
              type="text"
              value={address?.street}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Bairro</IonLabel>
            <IonInput
              type="text"
              value={address?.district}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Cidade</IonLabel>
            <IonInput
              type="text"
              value={address?.city}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">UF</IonLabel>
            <IonInput
              type="text"
              value={address?.state}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Número</IonLabel>
            <IonInput
              type="text"
              value={number}
              onIonChange={(e) => setNumber(e.detail.value!)}
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