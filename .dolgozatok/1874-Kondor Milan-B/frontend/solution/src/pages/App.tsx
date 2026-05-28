import { useEffect, useState } from "react";
import type { Hero } from "../types/Hero";
import apiClient, { baseURL } from "../api/apiClient";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function Main() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [cart, setCart] = useState<number[]>(
    JSON.parse(localStorage.getItem("cart") ?? "[]"),
  );

  useEffect(() => {
    apiClient.get("/champions").then((res) => setHeroes(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const generatedCard = (h: Hero) => {
    return (
      <Col>
        <Card style={{ width: "25rem", height: "35rem" }}>
          <Card.Header>
            <Carousel interval={null}>
              {h.images.map((s) => (
                <Carousel.Item>
                  <img
                    src={`${baseURL}/images/${s}`}
                    width={370}
                    height={250}
                    />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card.Header>
          <Card.Body>
            <Card.Title>{h.name}</Card.Title>
            <Card.Text>
              {h.description}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Szerep: {h.role} ({h.lane})
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => {
                if (!cart.includes(Number(h.id))) {
                  toast.success("Sikeresen a kosárba tetted!");
                  setCart([...cart, Number(h.id)]);
                } else {
                  toast.warning("Ez a termék már a kosárban van!");
                }
              }}
            >
              Kosárba
            </Button>
            <Card.Text style={{textAlign: "end"}}>
              Ár: <strong> {h.blue_essence} kék esszencia</strong>
            </Card.Text>
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Container>
        <Col>
          <Row lg={3} className="g-3">
            {heroes.map((h) => generatedCard(h))}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Main;