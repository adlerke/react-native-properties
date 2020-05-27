import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import api from '../../services/api'
import Moment from "moment";
import MapView, { Marker, UrlTile, PROVIDER_GOOGLE } from "react-native-maps";
import { Card, Button, Divider, Appbar } from "react-native-paper";
import styles from "./style";
import logoImg from "../../../assets/ok.png";
import axios from "axios";
import CustomBtn from '../../components/CustomBtn'

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const [pics, setPics] = useState({});
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const property = route.params.property;
  const wpMessage = `Olá *${property.users[0].name}*\nGostaria de saber mais sobre o imóvel https://alukey.com.br/details/${property.id}\nlocalizado em : https://www.google.com.br/maps?q=${lat},${lng}`
  function goBack() {
    navigation.goBack();
  }
  async function getLatLong() {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${property.address.street} ${property.address.district} ${property.address.cep}&key=`
    );
    setLat(response.data.results[0].geometry.location.lat);
    setLng(response.data.results[0].geometry.location.lng);
  }

  useEffect(() => {
    // getLatLong();
    if (property.pictures !== []) {
      setPics(property.pictures);
      console.log(pics===null?'oi' : 'nao')

    } else {
      console.log('aqui parou2')
      setPics({
        id: 1,
        picture:
          "https://image.shutterstock.com/image-vector/no-pictures-allowed-vector-icon-260nw-601163585.jpg",
      });
    }
  },[]);
  async function sendMessage() {
    Linking.openURL(`whatsapp://send?phone=+55${property.users[0].contact}&text=${wpMessage}`)
    await api.post(`/contactCount`, {
      user_id: property.users[0].id
    });
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.icons}>
            <FontAwesome name="arrow-left" color="white" size={20} />
          </TouchableOpacity>
          <Text style={styles.appTitle}>{property.name}</Text>
          <Image style={styles.logoAl} source={logoImg} />
        </Appbar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pics}>
            <FlatList
              data={pics}
              horizontal
              pagingEnabled
              keyExtractor={(pics) => String(pics.id)}
              showsHorizontalScrollIndicator={false}
              style={styles.cardPropertyList}
              renderItem={({ item: pics }) => {
                return (
                  <Image
                    resizeMode="cover"
                    key={pics.id}
                    style={styles.logo}
                    source={{
                      uri: `${pics.picture}`,
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.property}>
              <Card.Title
                title={
                  property.address
                    ? `${property.type.description} - ${property.address.district}`
                    : property.type.description
                }
                subtitle={`Publicado em ${Moment(property.created_at).format(
                  "D/MM/Y"
                )}`}
              />
              <Text style={styles.price}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(property.property_price)}
              </Text>
              <Divider style={{ marginTop: 20 }} />
              <Card.Content>
                <Text style={styles.caracs}>
                  {property.category.description}, {property.area}m², com{" "}
                  {property.bedrooms} quartos, {property.bathrooms} banheiros ,
                  {property.parking_spaces} vagas para garagem.
                  {property.is_pet_friendly == 1
                    ? " Aceita pet"
                    : " Não aceita pet"}
                </Text>
                <Divider style={{ marginTop: 20 }} />
                <Text style={styles.info}>
                  Condomínio:
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(property.condo_price)}
                </Text>
                <Text style={styles.info}>
                  IPTU:
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(property.iptu_price)}
                </Text>
              </Card.Content>
            </View>
            <Card style={styles.property}>
              <Card.Title title="Localização" />
              <Divider />
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                region={{
                  latitude: -10.945308,
                  longitude: -37.0772017,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com.br/maps?q=-10.945308,-37.0772017`
                    )
                  }
                  coordinate={{ latitude: -10.945308, longitude: -37.0772017 }}
                />
              </MapView>
            </Card>
            <Card style={styles.property}>
              <Card.Title title="Características" />
              <Divider />
              <Card.Content>
                {property.tags.map((element) => {
                  return (
                    <Text style={styles.tagsText} key={element.id}>
                      {element.description}
                    </Text>
                  );
                })}
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <CustomBtn
          handleClick={() => {}}
          icon={"calendar-clock"}
          text={"Agendar Visita"}
        />
        <CustomBtn
          handleClick={() => sendMessage()}
          icon={"whatsapp"}
          text={"Contato"}
        />
      </View>
    </>
  );
}