import styled from "styled-components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CalendarSection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.md} 0;
  }
`;

const CalendarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 1rem;
  }
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.primary};

  h2 {
    font-size: 2rem;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: white;
    cursor: pointer;
    margin: 0 0.5rem;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const DayCell = styled(motion.div)`
  aspect-ratio: 1;
  background: ${(props) =>
    props.hasEvent ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${(props) => (props.isToday ? "#FFD700" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 10px;
  padding: 0.5rem;
  color: ${(props) => (props.isToday ? "#FFD700" : "white")};
  cursor: ${(props) => (props.hasEvent ? "pointer" : "default")};
  position: relative;
  overflow: hidden;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.25rem;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const EventIndicator = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const EventsList = styled.div`
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const EventCard = styled(motion.div)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const EventTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const EventTime = styled.div`
  background: rgba(255, 215, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 0.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PyroDetails = styled.div`
  margin-top: 0.75rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 12px;
  border-left: 3px solid ${(props) => props.theme.colors.primary};

  @media (max-width: 768px) {
    padding: 0.75rem;
    margin-top: 0.5rem;
  }
`;

const PyroName = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const PyroCompany = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(255, 215, 0, 0.3);
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-left: 1rem;
  }
`;

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const WEEKDAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const valenciaEvents = {
  2025: {
    1: {
      1: { name: "Año Nuevo", type: "holiday", location: "Toda Valencia" },
      5: {
        name: "Cabalgata de Reyes",
        type: "festival",
        location: "Centro de Valencia",
        details: "18:00 - 21:00",
      },
      6: { name: "Día de Reyes", type: "holiday", location: "Toda Valencia" },
      17: {
        name: "San Antonio Abad",
        type: "religious",
        location: "Iglesia de San Antonio",
        details: "Bendición de animales",
      },
      22: {
        name: "San Vicente Mártir",
        type: "religious",
        location: "Catedral de Valencia",
      },
      24: {
        name: "Castillo de la Gala",
        type: "festival",
        location: "Alameda",
        details: "21:00 - Pirotecnia del Mediterráneo",
      },
      25: {
        name: "Castillo Exaltación Fallera Mayor",
        type: "festival",
        location: "Palau de la Música",
        details: "«Noche mágica» - Pirotecnia Crespo",
      },
      31: {
        name: "Inauguración Exposición del Ninot",
        type: "festival",
        location: "Museo de las Ciencias",
        details: "«La danza de los ninots» - Pirotecnia Turís",
      },
    },
    2: {
      2: {
        name: "Día de la Candelaria",
        type: "religious",
        location: "Varias iglesias",
      },
      25: {
        name: "Martes de Carnaval",
        type: "festival",
        location: "El Cabanyal",
      },
      26: {
        name: "Miércoles de Ceniza",
        type: "religious",
        location: "Iglesias de Valencia",
      },
      28: {
        name: "La Crida",
        type: "festival",
        location: "Torres de Serranos",
        details: "Inicio oficial de Fallas",
      },
      23: {
        name: "Despertà, Mascletà y Crida",
        type: "festival",
        location: "Plaza del Ayuntamiento y Torres de Serranos",
        details:
          "07:30 Despertà (Alto Palancia), 08:00 «Estruendo del amanecer valenciano» (Valenciana), 14:00 «Renacimiento de fuego y arte» (Valenciana), «Tornem!» (Peñarroja)",
      },
      28: {
        name: "Espectáculo Pirotécnico",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "23:59 - «Efímero» - Pirotecnia del Mediterráneo",
      },
    },
    3: {
      1: {
        name: "Mascletà y Espectáculo Nocturno",
        type: "festival",
        location: "Plaza del Ayuntamiento y Torres de Serranos",
        details:
          "14:00 «Tacaeta» (Peñarroja), 23:59 «La luz de la esperanza» (Gironina)",
      },
      2: {
        name: "Mascletà y Espectáculo",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Oda al poble valencià» (Gironina), 20:00 «La danza de las estrellas» (Zaragozana)",
      },
      3: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Valientes» - Pirotecnia Alto Palancia",
      },
      4: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Fums i sons» - Pirotecnia Dragón",
      },
      5: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 - «Terremoto terrestre en el cielo valenciano» - Pirotecnia Pibierzo",
      },
      6: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Sky Symphony» - Pirotecnia Zaragozana",
      },
      7: {
        name: "Mascletà y Espectáculo Nocturno",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «No podrán amb nosaltres» (Martí), 23:59 «Magia y color en la Plaza del Ayuntamiento de València» (Pibierzo)",
      },
      8: {
        name: "Mascletà y Espectáculo Nocturno",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Los colores de la música» (Nadal-Martí), 23:59 «València en colors» (Martí)",
      },
      9: {
        name: "Mascletà y Espectáculo",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Mascletà 4.0» (Alpujarreña), 20:00 «Amor por la pólvora» (Alto Palancia)",
      },
      10: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «El cor de la plaça» - Pirotecnia Turís",
      },
      11: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Batec de foc» - Pirotecnia Tomás",
      },
      12: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Sinfonía cridà con arte» - Pirotecnia Crespo",
      },
      13: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Sinfonía de luz y misterio» - Pirotecnia Tamarit",
      },
      14: {
        name: "Mascletà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details: "14:00 - «Tots a una veu» - Pirotecnia Hnos. Caballer",
      },
      15: {
        name: "Mascletà y Alba de les Falles",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Valencians, en peu, alceu-se» (Aitana), 23:59 «La llum de les flames josefines» (Valenciana)",
      },
      16: {
        name: "Mascletà y Castell",
        type: "festival",
        location: "Plaza del Ayuntamiento y Pont de Montolivet",
        details:
          "14:00 «Sinfonía de pólvora Mediterránea» (Valenciana), 23:59 «Castillo tradicional e insólito» (Vulcano)",
      },
      17: {
        name: "Mascletà y Castell",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Mascletà 360º» (Vulcano), 23:59 «De València al món» (Martí)",
      },
      18: {
        name: "Mascletà y Nit del Foc",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Sinfonía del Mediterráneo» (Mediterráneo), 23:59 «Llum, foc i colors» (Valenciana)",
      },
      19: {
        name: "Mascletà, Cabalgata del Foc y Cremà",
        type: "festival",
        location: "Plaza del Ayuntamiento",
        details:
          "14:00 «Crecendo final» (FX Caballer), 19:00 «Les flames de les Falles», 23:59 «La danza de las llamas» (FX Caballer)",
      },
    },
    4: {
      13: {
        name: "Domingo de Ramos",
        type: "religious",
        location: "Todas las iglesias",
      },
      17: {
        name: "Jueves Santo",
        type: "religious",
        location: "Toda Valencia",
      },
      18: {
        name: "Viernes Santo",
        type: "religious",
        location: "Toda Valencia",
      },
      20: {
        name: "Domingo de Pascua",
        type: "religious",
        location: "Toda Valencia",
      },
      23: {
        name: "San Vicente Ferrer",
        type: "religious",
        location: "Centro histórico",
        details: "Altares en las calles",
      },
    },
    5: {
      1: {
        name: "Día del Trabajo",
        type: "holiday",
        location: "Toda Valencia",
      },
      15: {
        name: "San Isidro Labrador",
        type: "religious",
        location: "Huerta valenciana",
      },
      "30-31": {
        name: "Gran Fira de València",
        type: "festival",
        location: "Varios lugares",
      },
    },
    6: {
      "1-30": {
        name: "Gran Fira de València",
        type: "festival",
        location: "Varios lugares",
      },
      23: {
        name: "Noche de San Juan - Hogueras",
        type: "festival",
        location: "Playas de Valencia",
        details: "Desde 23:00",
      },
      24: {
        name: "San Juan",
        type: "festival",
        location: "Playas de Valencia",
      },
    },
    7: {
      "1-31": {
        name: "Festivales de Verano",
        type: "festival",
        location: "Jardines de Viveros",
      },
      25: {
        name: "Santiago Apóstol",
        type: "religious",
        location: "Iglesia de Santiago",
      },
      "26-31": {
        name: "Festival de Jazz",
        type: "festival",
        location: "Palau de la Música",
      },
    },
    8: {
      "1-31": {
        name: "Cinema d'Estiu",
        type: "festival",
        location: "Varios lugares",
      },
      15: {
        name: "Asunción de la Virgen",
        type: "religious",
        location: "Catedral de Valencia",
      },
      29: {
        name: "Batalla de Flores",
        type: "festival",
        location: "Paseo de la Alameda",
      },
    },
    9: {
      8: {
        name: "Día de la Virgen",
        type: "religious",
        location: "Basílica de la Virgen",
      },
      "15-30": {
        name: "Mostra de València",
        type: "festival",
        location: "Varios cines de la ciudad",
      },
    },
    10: {
      9: {
        name: "Día de la Comunidad Valenciana",
        type: "holiday",
        location: "Toda Valencia",
        details: "Procesión Cívica",
      },
      12: {
        name: "Día de la Hispanidad",
        type: "holiday",
        location: "Toda Valencia",
      },
      31: { name: "Halloween", type: "festival", location: "Varios barrios" },
    },
    11: {
      1: {
        name: "Todos los Santos",
        type: "religious",
        location: "Cementerios de la ciudad",
      },
      "15-30": {
        name: "Festival de las Artes",
        type: "festival",
        location: "Varios espacios culturales",
      },
    },
    12: {
      6: {
        name: "Día de la Constitución",
        type: "holiday",
        location: "Toda Valencia",
      },
      8: {
        name: "Inmaculada Concepción",
        type: "religious",
        location: "Toda Valencia",
      },
      "22-24": {
        name: "Mercados Navideños",
        type: "festival",
        location: "Plaza del Ayuntamiento y otros",
      },
      24: { name: "Nochebuena", type: "holiday", location: "Toda Valencia" },
      25: { name: "Navidad", type: "holiday", location: "Toda Valencia" },
      31: {
        name: "Nochevieja",
        type: "holiday",
        location: "Plaza del Ayuntamiento",
        details: "Campanadas",
      },
    },
  },
};

const valenciaEventsEN = {
  2025: {
    1: {
      1: { name: "New Year", type: "holiday", location: "All Valencia" },
      5: {
        name: "Three Kings Parade",
        type: "festival",
        location: "Valencia City Center",
        details: "18:00 - 21:00",
      },
      6: { name: "Epiphany", type: "holiday", location: "All Valencia" },
      17: {
        name: "Saint Anthony the Abbot",
        type: "religious",
        location: "Saint Anthony Church",
        details: "Blessing of animals",
      },
      22: {
        name: "Saint Vincent Martyr",
        type: "religious",
        location: "Valencia Cathedral",
      },
      24: {
        name: "Gala Fireworks Display",
        type: "festival",
        location: "Alameda",
        details: "21:00 - Pirotecnia del Mediterráneo",
      },
      25: {
        name: "Fallera Mayor Exaltation Castle",
        type: "festival",
        location: "Palau de la Música",
        details: "«Magic Night» - Pirotecnia Crespo",
      },
      31: {
        name: "Ninot Exhibition Opening",
        type: "festival",
        location: "Science Museum",
        details: "«The Dance of Ninots» - Pirotecnia Turís",
      },
    },
    2: {
      2: {
        name: "Candlemas Day",
        type: "religious",
        location: "Various churches",
      },
      25: {
        name: "Carnival Tuesday",
        type: "festival",
        location: "El Cabanyal",
      },
      26: {
        name: "Ash Wednesday",
        type: "religious",
        location: "Valencia Churches",
      },
      28: {
        name: "La Crida",
        type: "festival",
        location: "Serranos Towers",
        details: "Official start of Fallas",
      },
      23: {
        name: "Despertà, Mascletà and Crida",
        type: "festival",
        location: "City Hall Square and Serranos Towers",
        details:
          "07:30 Despertà (Alto Palancia), 08:00 «Valencian Dawn Thunder» (Valenciana), 14:00 «Renaissance of Fire and Art» (Valenciana), «We Return!» (Peñarroja)",
      },
    },
    3: {
      1: {
        name: "Mascletà and Night Show",
        type: "festival",
        location: "City Hall Square and Serranos Towers",
        details:
          "14:00 «Tacaeta» (Peñarroja), 23:59 «The Light of Hope» (Gironina)",
      },
      2: {
        name: "Mascletà y Espectáculo",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Oda al poble valencià» (Gironina), 20:00 «La danza de las estrellas» (Zaragozana)",
      },
      3: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Valientes» - Pirotecnia Alto Palancia",
      },
      4: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Fums i sons» - Pirotecnia Dragón",
      },
      5: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 - «Terremoto terrestre en el cielo valenciano» - Pirotecnia Pibierzo",
      },
      6: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Sky Symphony» - Pirotecnia Zaragozana",
      },
      7: {
        name: "Mascletà y Espectáculo Nocturno",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «No podrán amb nosaltres» (Martí), 23:59 «Magia y color en la Plaza del Ayuntamiento de València» (Pibierzo)",
      },
      8: {
        name: "Mascletà y Espectáculo Nocturno",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Los colores de la música» (Nadal-Martí), 23:59 «València en colors» (Martí)",
      },
      9: {
        name: "Mascletà y Espectáculo",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Mascletà 4.0» (Alpujarreña), 20:00 «Amor por la pólvora» (Alto Palancia)",
      },
      10: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «El cor de la plaça» - Pirotecnia Turís",
      },
      11: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Batec de foc» - Pirotecnia Tomás",
      },
      12: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Sinfonía cridà con arte» - Pirotecnia Crespo",
      },
      13: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Sinfonía de luz y misterio» - Pirotecnia Tamarit",
      },
      14: {
        name: "Mascletà",
        type: "festival",
        location: "City Hall Square",
        details: "14:00 - «Tots a una veu» - Pirotecnia Hnos. Caballer",
      },
      15: {
        name: "Mascletà y Alba de les Falles",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Valencians, en peu, alceu-se» (Aitana), 23:59 «La llum de les flames josefines» (Valenciana)",
      },
      16: {
        name: "Mascletà y Castell",
        type: "festival",
        location: "City Hall Square and Pont de Montolivet",
        details:
          "14:00 «Sinfonía de pólvora Mediterránea» (Valenciana), 23:59 «Castillo tradicional e insólito» (Vulcano)",
      },
      17: {
        name: "Mascletà y Castell",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Mascletà 360º» (Vulcano), 23:59 «De València al món» (Martí)",
      },
      18: {
        name: "Mascletà y Nit del Foc",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Sinfonía del Mediterráneo» (Mediterráneo), 23:59 «Llum, foc i colors» (Valenciana)",
      },
      19: {
        name: "Mascletà, Fire Parade and Cremà",
        type: "festival",
        location: "City Hall Square",
        details:
          "14:00 «Final Crescendo» (FX Caballer), 19:00 «The Flames of Fallas», 23:59 «The Dance of Flames» (FX Caballer)",
      },
    },
    4: {
      13: {
        name: "Domingo de Ramos",
        type: "religious",
        location: "Todas las iglesias",
      },
      17: {
        name: "Jueves Santo",
        type: "religious",
        location: "Toda Valencia",
      },
      18: {
        name: "Viernes Santo",
        type: "religious",
        location: "Toda Valencia",
      },
      20: {
        name: "Domingo de Pascua",
        type: "religious",
        location: "Toda Valencia",
      },
      23: {
        name: "San Vicente Ferrer",
        type: "religious",
        location: "Centro histórico",
        details: "Altares en las calles",
      },
    },
    5: {
      1: {
        name: "Día del Trabajo",
        type: "holiday",
        location: "Toda Valencia",
      },
      15: {
        name: "San Isidro Labrador",
        type: "religious",
        location: "Huerta valenciana",
      },
      "30-31": {
        name: "Gran Fira de València",
        type: "festival",
        location: "Varios lugares",
      },
    },
    6: {
      "1-30": {
        name: "Gran Fira de València",
        type: "festival",
        location: "Varios lugares",
      },
      23: {
        name: "Noche de San Juan - Hogueras",
        type: "festival",
        location: "Playas de Valencia",
        details: "Desde 23:00",
      },
      24: {
        name: "San Juan",
        type: "festival",
        location: "Playas de Valencia",
      },
    },
    7: {
      "1-31": {
        name: "Festivales de Verano",
        type: "festival",
        location: "Jardines de Viveros",
      },
      25: {
        name: "Santiago Apóstol",
        type: "religious",
        location: "Iglesia de Santiago",
      },
      "26-31": {
        name: "Festival de Jazz",
        type: "festival",
        location: "Palau de la Música",
      },
    },
    8: {
      "1-31": {
        name: "Cinema d'Estiu",
        type: "festival",
        location: "Varios lugares",
      },
      15: {
        name: "Asunción de la Virgen",
        type: "religious",
        location: "Catedral de Valencia",
      },
      29: {
        name: "Batalla de Flores",
        type: "festival",
        location: "Paseo de la Alameda",
      },
    },
    9: {
      8: {
        name: "Día de la Virgen",
        type: "religious",
        location: "Basílica de la Virgen",
      },
      "15-30": {
        name: "Mostra de València",
        type: "festival",
        location: "Varios cines de la ciudad",
      },
    },
    10: {
      9: {
        name: "Día de la Comunidad Valenciana",
        type: "holiday",
        location: "Toda Valencia",
        details: "Procesión Cívica",
      },
      12: {
        name: "Día de la Hispanidad",
        type: "holiday",
        location: "Toda Valencia",
      },
      31: { name: "Halloween", type: "festival", location: "Varios barrios" },
    },
    11: {
      1: {
        name: "Todos los Santos",
        type: "religious",
        location: "Cementerios de la ciudad",
      },
      "15-30": {
        name: "Festival de las Artes",
        type: "festival",
        location: "Varios espacios culturales",
      },
    },
    12: {
      6: {
        name: "Constitution Day",
        type: "holiday",
        location: "All Valencia",
      },
      8: {
        name: "Immaculate Conception",
        type: "religious",
        location: "All Valencia",
      },
      "22-24": {
        name: "Christmas Markets",
        type: "festival",
        location: "City Hall Square and others",
      },
      24: { name: "Christmas Eve", type: "holiday", location: "All Valencia" },
      25: { name: "Christmas Day", type: "holiday", location: "All Valencia" },
      31: {
        name: "New Year's Eve",
        type: "holiday",
        location: "City Hall Square",
        details: "Bell Chimes",
      },
    },
  },
};

const ValenciaEvents = () => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getEvents = () => {
    return i18n.language === "es" ? valenciaEvents : valenciaEventsEN;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthEvents = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return getEvents()[year]?.[month] || {};
  };

  const getMonthName = (monthIndex) => {
    return i18n.language === "es"
      ? MONTHS_ES[monthIndex]
      : MONTHS_EN[monthIndex];
  };

  const getWeekDays = () => {
    return i18n.language === "es" ? WEEKDAYS_ES : WEEKDAYS_EN;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const monthEvents = getMonthEvents();
    const today = new Date();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
      const hasEvent = !!monthEvents[day];

      return (
        <DayCell
          key={day}
          isToday={isToday}
          hasEvent={hasEvent}
          onClick={() => hasEvent && setSelectedDate(day)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
          {hasEvent && <EventIndicator />}
        </DayCell>
      );
    });
  };

  return (
    <CalendarSection>
      <CalendarContainer>
        <MonthHeader>
          <h2>{`${getMonthName(
            currentDate.getMonth()
          )} ${currentDate.getFullYear()}`}</h2>
          <div>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                )
              }
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                )
              }
            >
              →
            </button>
          </div>
        </MonthHeader>

        <CalendarGrid>
          {getWeekDays().map((day, index) => (
            <DayCell key={`weekday-${index}`} isHeader>
              {day}
            </DayCell>
          ))}
          {renderCalendar()}
        </CalendarGrid>

        {selectedDate && getMonthEvents()[selectedDate] && (
          <EventsList>
            <EventCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <EventTitle>
                {getMonthEvents()[selectedDate].type === "festival"
                  ? "🎆"
                  : "🎉"}{" "}
                {getMonthEvents()[selectedDate].name}
              </EventTitle>

              <EventTime>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {getMonthEvents()[selectedDate].details
                  ? getMonthEvents()
                      [selectedDate].details.split(",")
                      .map((detail, index) => (
                        <span key={index}>{detail.trim()}</span>
                      ))
                  : "Todo el día"}
              </EventTime>

              <EventInfo>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {getMonthEvents()[selectedDate].location}
              </EventInfo>

              {getMonthEvents()[selectedDate].details?.includes(
                "Pirotecnia"
              ) && (
                <PyroDetails>
                  {getMonthEvents()
                    [selectedDate].details.split(",")
                    .map((detail, index) => {
                      if (
                        detail.includes("Pirotecnia") ||
                        detail.includes("«")
                      ) {
                        const [showName, pyroCompany] = detail
                          .split("-")
                          .map((s) => s.trim());
                        return (
                          <div key={index}>
                            <PyroName>
                              🎇{" "}
                              {showName.includes("«")
                                ? showName
                                : "Espectáculo Pirotécnico"}
                            </PyroName>
                            {pyroCompany && (
                              <PyroCompany>✨ {pyroCompany}</PyroCompany>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                </PyroDetails>
              )}

              <EventInfo>
                {getMonthEvents()[selectedDate].type === "religious"
                  ? "⛪"
                  : getMonthEvents()[selectedDate].type === "holiday"
                  ? "📅"
                  : getMonthEvents()[selectedDate].type === "festival"
                  ? "🎊"
                  : "🎉"}
                {t(`events.types.${getMonthEvents()[selectedDate].type}`)}
              </EventInfo>
            </EventCard>
          </EventsList>
        )}
      </CalendarContainer>
    </CalendarSection>
  );
};

export default ValenciaEvents;
