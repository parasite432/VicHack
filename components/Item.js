import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

export default function Item() {
  return (
    <Card>
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  );
}
