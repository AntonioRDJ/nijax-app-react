import { Geolocation } from "@awesome-cordova-plugins/geolocation";
import { IonButton, IonIcon, IonLoading } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";

export type GeolocationButtonProps = {
  onCapture: (lat: number, lng: number) => void;
}

export const GeolocationButton = (props: GeolocationButtonProps) => {
  const { onCapture } = props;
  const [loading, setLoading] = useState(false);
  const { presentToast } = useGlobal();

  const getGeolocation = async () => {
    try {
      setLoading(true);
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });
      onCapture(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      presentToast({message: "Não foi possível acessar sua localização.", color: "warning"});
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <IonLoading
        isOpen={loading}
        message="Pegando a localização..."
        onDidDismiss={() => setLoading(false)}
      />
      <IonButton onClick={getGeolocation} fill="clear">
        <IonIcon slot="icon-only" icon={locationOutline}></IonIcon>
      </IonButton>
    </>
  );
}