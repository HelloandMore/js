import { useEffect, useState } from "react";
import type { Hero } from "../types/Hero";
import apiClient from "../api/apiClient";
import {
  Button,
  Card,
  CardSubtitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [cart, setCart] = useState<number[]>(
    JSON.parse(localStorage.getItem("cart") ?? "[]"),
  );

  useEffect(() => {
    apiClient
      .get("/champions")
      .then((res) => setHeroes(res.data))
      .catch(() => toast.error("Hiba történt a hősök lekérése közben!"));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const sum = cart.reduce((total, id) => {
    const hero = heroes.find((m) => m.id == id);
    return total + Number(hero?.blue_essence);
  }, 0);

  return (
    <Container>
      <h1>Kosár</h1>
      {cart.length > 0 ? (
        <>
          <Col>
            <Row lg={3} className="g-3">
              {cart.map((id, index) => {
                const hero = heroes.find((m) => m.id == id);
                return (
                  <Card style={{ width: "25rem" }}>
                    <Card.Body style={{ textAlign: "start" }}>
                      <Card.Title>{hero?.name}</Card.Title>
                      <Card.Text>Szerep: {hero?.role}</Card.Text>
                      <Card.Text>Lane: {hero?.lane}</Card.Text>
                      <Card.Text>
                        Ár:<strong> {hero?.blue_essence} kék esszencia</strong>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ alignSelf: "end" }}>
                      <Button
                        onClick={() => {
                          removeFromCart(index);
                        }}
                        variant="danger"
                      >
                        Eltávolítás
                      </Button>
                    </Card.Footer>
                  </Card>
                );
              })}
            </Row>
          </Col>
          <Row>
            <Col className="g-4">
              <h2 style={{ textAlign: "start" }}>
                Összesen: <strong>{sum} kék esszencia</strong>
              </h2>
            </Col>
            <Col className="g-4">
              <Button
                variant="secondary"
                onClick={() =>
                  confirm("Biztosan üríteni szeretnéd a kosarat?") &&
                  setCart([])
                }
              >
                Kosár ürítése
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <p className="mb-2 text-muted">A kosár jelenleg üres.</p>
        </>
      )}
    </Container>
  );
};

export default Cart;
