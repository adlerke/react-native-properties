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
  Animated,
  ImageBackground,
} from "react-native";
import api from "../../api";
import { Appbar, Card, Title, Paragraph, Divider } from "react-native-paper";
import logoImg from "../../../assets/favicon.png";
import styles from "./styles";

export default function PropertyList() {
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);
  const [properties, setProperties] = useState([]);
  const animateIn = useRef(new Animated.Value(1)).current;
  const animatePressIn = () => {
    Animated.timing(animateIn, {
      toValue: 1,
      duration: 200,
    }).start();
  };
  const animatePressOut = () => {
    Animated.timing(animateIn, {
      toValue: 0.5,
      duration: 200,
    }).start();
  };
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
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.header}>
          <Text style={styles.appTitle}>Alukey</Text>
          <Image style={styles.logo} source={logoImg} />
        </Appbar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>
            Buscar por Categorias{" "}
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
              }
              return (
                
                <Animated.View
                  style={[
                   styles.property,

                    {
                      transform: [
                        {
                          scale: animateIn.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.98, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                <Card
                  onPress={() => navigateToDetail(property)}
                  onTouchStart={animatePressOut}
                  onTouchEnd={animatePressIn}
                  style={styles.bxs}
                >
                  <Card.Cover
                    source={{
                      uri: `${property.picture}`,
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
                </Animated.View>
               
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
