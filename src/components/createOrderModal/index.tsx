import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonRange, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCreateOrderMutation } from "../../services/order/order.service";
import { CreateOrderRequest } from "../../services/order/types";
import { useLazyGetAddressByLocationQuery } from "../../services/user/user.service";
import { Address } from "../../services/viacep/types";
import { useLazyGetAddressQuery } from "../../services/viacep/viacep.service";
import { useAppDispatch } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";
import { validateCep } from "../../utils/validations";
import { GeolocationButton } from "../geolocationButton";

const requiredFields = ["title", "description", "service", "address", "cep", "number", "distance"];

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
  const [distance, setDistance] = useState<number>(1);

  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const [createOrder] = useCreateOrderMutation();
  const [getAddress] = useLazyGetAddressQuery();
  const [getAddressByLocation] = useLazyGetAddressByLocationQuery();

  const handleConfirm = async () => {
    let orderToCreate: any = {title, description, service, cep, number, address, distance};
    if(requiredFields.some(key => !orderToCreate[key as keyof typeof orderToCreate])) {
      presentToast({message: "Por favor preencha todos os campos."});
      return;
    }

    orderToCreate = {
      ...orderToCreate,
      ...orderToCreate.address,
    };
    delete orderToCreate.address;

    try {
      const { data } = await createOrder(orderToCreate as CreateOrderRequest).unwrap();
      presentToast({message: "Pedido criado com sucesso.", color: "success"});
      handleClose();
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    }
  };

  const handleBlurCep = async (cep?: string) => {
    if(!validateCep(cep)) {
      return
    }
    try {
      const data = await getAddress(cep!).unwrap();

      if(data.erro) {
        return presentToast({message: "Cep n??o encontrado.", color: "warning"});
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

  const handleCaptureLocation = async (lat: number, lng: number) => {
    try {
      const {data: {address}} = await getAddressByLocation({lat, lng}).unwrap();
      setCep(address.cep);
      handleBlurCep(address.cep);
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados da localiza????o.", color: "danger"});
    }
  }

  const handleClose = () => {
    setTitle(undefined);
    setDescription(undefined);
    setService(undefined);
    setAddress(undefined);
    setCep(undefined);
    setNumber(undefined);
    setDistance(1);
    onClose();
  }

  return (
    <IonModal isOpen={open} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Criar um pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList style={{padding: "0 12px", overflow: "hidden"}}>
          <IonItem>
            <IonLabel position="floating">T??tulo</IonLabel>
            <IonInput
              type="text"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Descri????o</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              autoGrow={true}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Servi??o prestado *</IonLabel>
            <IonSelect placeholder="Selecione" value={service} onIonChange={(e) => setService(e.detail.value)}>
              {Object.entries(ServiceBR).map(([key, value]) => (
                <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Utilizar localiza????o</IonLabel>
            <GeolocationButton onCapture={handleCaptureLocation}/>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">CEP</IonLabel>
            <IonInput
              type="text"
              value={cep}
              onIonChange={(e) => setCep(e.detail.value!)}
              onIonBlur={() => handleBlurCep(cep)}
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
            <IonLabel position="floating">N??mero</IonLabel>
            <IonInput
              type="text"
              value={number}
              onIonChange={(e) => setNumber(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Raio de procura (km)</IonLabel>
            <IonRange
              debounce={50}
              min={1}
              max={150}
              value={distance}
              onIonChange={({ detail }) => setDistance(detail.value! as number)}
              pin={true}
            ></IonRange>
          </IonItem>
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