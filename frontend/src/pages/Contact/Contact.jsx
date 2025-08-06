import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SEOHelmet from "../../components/SEO/SEOHelmet";
import { seoConfig } from "../../config/seo.config";

const ContactSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: #000000;
  padding: 6rem 0;
  overflow: hidden;
  margin-top: 100px;
`;

const Container = styled(motion.div)`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 300;
`;

const Text = styled(motion.p)`
  font-size: clamp(1.1rem, 1.5vw, 1.25rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Form = styled.form`
  padding: 3rem;
  display: grid;
  gap: 2rem;
  border: 1px solid transparent;
  border-image: linear-gradient(
      transparent,
      ${(props) => props.theme.colors.primary},
      transparent
    )
    1;
  border-width: 0 2px 0 2px;
  background: radial-gradient(
    100% 61.73% at 100% 50%,
    rgba(255, 224, 166, 0.05) 0%,
    transparent 100%
  );
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 1px solid transparent;
    border-image: inherit;
    z-index: -1;
  }

  &::before {
    inset: -1rem;
    opacity: 15%;
  }

  &::after {
    inset: -2rem;
    opacity: 5%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: radial-gradient(
    47.3% 73.08% at 50% 94.23%,
    rgba(255, 255, 255, 0.1) 5%,
    rgba(0, 0, 0, 0) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:focus-within {
    border-image: radial-gradient(
        circle,
        ${(props) => props.theme.colors.primary} 0%,
        transparent 100%
      )
      1;
    background: radial-gradient(
      47.3% 73.08% at 50% 94.23%,
      rgba(255, 224, 166, 0.1) 5%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: 1rem;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  font-size: 15px;
  padding: 0.7em 2.7em;
  letter-spacing: 0.06em;
  position: relative;
  font-family: inherit;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  text-decoration: none;
  border: 2px solid ${(props) => props.theme.colors.primary};
  background: linear-gradient(
    to right,
    rgba(252, 230, 125, 0.1) 1%,
    transparent 40%,
    transparent 60%,
    rgba(252, 230, 125, 0.1) 100%
  );
  color: ${(props) => props.theme.colors.primary};
  box-shadow: inset 0 0 10px rgba(252, 230, 125, 0.4),
    0 0 9px 3px rgba(252, 230, 125, 0.1);
  cursor: pointer;
  outline: none;

  &:hover {
    color: #fff;
    box-shadow: inset 0 0 10px rgba(252, 230, 125, 0.6),
      0 0 9px 3px rgba(252, 230, 125, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform 0.4s ease-in-out;
    background: linear-gradient(
      to right,
      transparent 1%,
      rgba(252, 230, 125, 0.1) 40%,
      rgba(252, 230, 125, 0.1) 60%,
      transparent 100%
    );
  }

  &:hover:before {
    transform: translateX(15em);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    text-align: center;
    border: none;
    background: none;
    box-shadow: none;

    &:before {
      display: none;
    }
  }
`;

const InstagramSection = styled(motion.div)`
  margin-top: 4rem;
  text-align: center;
`;

const InstagramLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "es";
  const seo = seoConfig[currentLanguage]?.contact || seoConfig.es.contact;
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    console.log("📝 Enviando formulario...", formData);

    try {
      console.log("🚀 Haciendo petición al backend...");
      const response = await axios.post(
        "http://localhost:3001/api/send-email",
        formData
      );
      console.log("✅ Respuesta del servidor:", response.data);

      if (response.data.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("❌ Error al enviar:", error);
      setStatus({
        submitting: false,
        success: false,
        error: error.response?.data?.error || "Error al enviar el mensaje",
      });
    }
  };

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        schema={seo.schema}
      />
      <ContactSection ref={ref}>
        <Container style={{ opacity }}>
          <ContentWrapper>
            <Title
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("contact.title")}
            </Title>
            <Text
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("contact.description1")}
            </Text>
            <Text
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("contact.description2")}
            </Text>
            <InstagramSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <InstagramLink
                href="https://www.instagram.com/mlab.vlc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
                {t("contact.instagramButton")}
              </InstagramLink>
            </InstagramSection>
          </ContentWrapper>

          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={t("contact.form.firstName")}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  name="lastName"
                  placeholder={t("contact.form.lastName")}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("contact.form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t("contact.form.phone")}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  name="message"
                  placeholder={t("contact.form.message")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("contact.form.submitButton")}
              </SubmitButton>
            </Form>
          </FormWrapper>
        </Container>
      </ContactSection>
    </>
  );
};

export default Contact;
