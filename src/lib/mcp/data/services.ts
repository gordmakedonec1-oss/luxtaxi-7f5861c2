export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  featureKeys: string[];
}

export const services: Service[] = [
  {
    id: "vip",
    titleKey: "servicesPage.vip.title",
    descriptionKey: "servicesPage.vip.description",
    featureKeys: [
      "servicesPage.vip.feature1",
      "servicesPage.vip.feature2",
      "servicesPage.vip.feature3",
      "servicesPage.vip.feature4",
      "servicesPage.vip.feature5",
    ],
  },
  {
    id: "corporate",
    titleKey: "servicesPage.corporate.title",
    descriptionKey: "servicesPage.corporate.description",
    featureKeys: [
      "servicesPage.corporate.feature1",
      "servicesPage.corporate.feature2",
      "servicesPage.corporate.feature3",
      "servicesPage.corporate.feature4",
      "servicesPage.corporate.feature5",
    ],
  },
  {
    id: "delegations",
    titleKey: "servicesPage.delegations.title",
    descriptionKey: "servicesPage.delegations.description",
    featureKeys: [
      "servicesPage.delegations.feature1",
      "servicesPage.delegations.feature2",
      "servicesPage.delegations.feature3",
      "servicesPage.delegations.feature4",
      "servicesPage.delegations.feature5",
    ],
  },
  {
    id: "airport",
    titleKey: "servicesPage.airport.title",
    descriptionKey: "servicesPage.airport.description",
    featureKeys: [
      "servicesPage.airport.feature1",
      "servicesPage.airport.feature2",
      "servicesPage.airport.feature3",
      "servicesPage.airport.feature4",
      "servicesPage.airport.feature5",
    ],
  },
];
