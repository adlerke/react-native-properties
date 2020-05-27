import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Images } from "../../../assets/images/index";

import {
  ScrollView,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import api from "../../services/api";
import { Appbar, Card, Title, Paragraph, Divider } from "react-native-paper";
import logoImg from "../../../assets/ok.png";
import styles from "./styles";

export default function PropertyList() {
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);
  const [properties, setProperties] = useState([]);

  function navigateToDetail(property) {
    navigation.navigate("Details", { property });
  }
  async function getTags() {
    const response = await api.get("/getTags");
    setTags(response.data);
  }
  async function getProperty() {
    const response = await api.get("/getProperties");

    setProperties(response.data.data);
  }
  useEffect(() => {
    getTags();
    getProperty();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Appbar style={styles.header}>
          <Image style={styles.logo} source={logoImg} />
        </Appbar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>
            Categorias{" "}
            <Ionicons name="ios-arrow-forward" size={15} color="black" />
          </Text>
          <FlatList
            data={tags}
            horizontal
            keyExtractor={(tags) => String(tags.id)}
            showsHorizontalScrollIndicator={false}
            style={styles.cardPropertyList}
            renderItem={({ item: tags }) => {
              if (tags.is_checkbox === 0 || tags.description === "Piscina") {
                return (
                  <TouchableOpacity style={styles.tagCard} activeOpacity={0.8} onPress={()=>{}}>
                      <ImageBackground
                        imageStyle={{ borderRadius: 10 }}
                        source={Images[tags.class]}
                        resizeMode="cover"
                        style={styles.imageTag}
                      >
                        <Text style={styles.tagText}>{tags.description}</Text>
                      </ImageBackground>
                  </TouchableOpacity>
                );
              }
            }}
          />
          <Divider style={{ marginBottom: 20, marginTop: 20 }} />
          <FlatList
            data={properties}
            keyExtractor={(property) => String(property.id)}
            showsVerticalScrollIndicator={false}
            style={styles.cardPropertyList}
            renderItem={({ item: property }) => {
              if (property.picture === "") {
                Pic =
                  "https://image.shutterstock.com/image-vector/no-pictures-allowed-vector-icon-260nw-601163585.jpg";
              }else{
                Pic = property.picture
              }
              return (
                
                <View
                  style={
                   styles.property}
                >
                <Card
                  onPress={() => navigateToDetail(property)}
                  style={styles.bxs}
                >
                  <Card.Cover
                    source={{
                      uri: `${Pic}`,
                    }}
                    resizeMode="contain"
                  />
                  <Card.Content>
                    <View style={styles.rowDisplay}>
                      <Title style={styles.caracs}>
                        {property.bedrooms} <FontAwesome name="bed" size={20} />{" "}
                        {property.bathrooms}{" "}
                        <FontAwesome name="bath" size={20} />{" "}
                        {property.parking_spaces}{" "}
                        <FontAwesome name="car" size={20} />
                        {"  "}
                        {property.is_pet_friendly == 1 ? (
                          <FontAwesome name="paw" size={20} />
                        ) : (
                          ""
                        )}
                      </Title>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          {property.type.description}
                        </Text>
                      </View>
                    </View>
                    <Paragraph>
                      {property.address.street}{" "}
                      {property.address.street >= 1
                        ? property.address.street
                        : ""}
                    </Paragraph>
                    <Paragraph>
                      {property.address.district} - {property.address.cep}{" "}
                    </Paragraph>
                    <Paragraph>
                      <Text style={styles.texts}>Valor : </Text>
                      <Text>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(property.property_price)}
                      </Text>
                    </Paragraph>
                  </Card.Content>
                </Card>
                </View>
               
              );
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}
