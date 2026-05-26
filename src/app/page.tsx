"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  FileQuestion,
  Network,
  RadioTower,
  Scale,
  Search,
  ShieldAlert,
  Vote
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const BLUE = "#011EF4";
const DEEP_BLUE = "#0118BF";
const YELLOW = "#FBBB02";
const PALE_YELLOW = "#FFE981";
const GRAY = "#6F7072";

const blocks = [
  {
    id: "estado",
    title: "Reforma del Estado",
    fpName: "Vladimiro Huaroc",
    jppName: "Sinesio López",
    objective: "Contrastar cómo reformar un Estado percibido como lento, ineficiente, inestable o capturado.",
    fp: {
      main: "Estado moderno, ágil y eficiente, con Presidencia como centro estratégico de gobierno.",
      problem: "Burocracia, trámites eternos, falta de coordinación entre ministerios, regiones y municipios.",
      instruments: ["Centro estratégico", "Digitalización pública", "Coordinación intergubernamental"],
      concretion: "Media",
      viability: "Media-alta",
      risks: "No define arquitectura institucional, presupuesto ni estándares de interoperabilidad. Riesgo de centralización excesiva.",
      quote: "El Estado debe funcionar, resolver problemas concretos de los peruanos."
    },
    jpp: {
      main: "Reconstruir capacidades estatales, autonomía de órganos de control y descentralización.",
      problem: "Inestabilidad política, captura institucional, baja presión tributaria y débil presencia estatal territorial.",
      instruments: ["Autonomía de órganos de control", "Control social", "Descentralización", "Más recursos fiscales"],
      concretion: "Media-baja",
      viability: "Media",
      risks: "Diagnóstico robusto, pero sin secuencia normativa, fiscal ni administrativa para ejecutar la reforma.",
      quote: "El Estado está desigualmente distribuido en el territorio."
    },
    tech: ["Gobierno digital", "Interoperabilidad", "Transformación digital del Estado"]
  },
  {
    id: "juventud",
    title: "Juventud y Deporte",
    fpName: "Rosángela Barbarán",
    jppName: "Ernesto Sunini",
    objective: "Evaluar políticas para empleo joven, educación, emprendimiento, deporte, salud mental y vida independiente.",
    fp: {
      main: "Modernización de educación técnica, Jóvenes Productivos, capital semilla, impuesto cero e IPD en PCM.",
      problem: "Desempleo juvenil, jóvenes que no estudian ni trabajan, falta de experiencia y abandono deportivo.",
      instruments: ["Becas", "Alianzas con empresas", "Capital semilla", "Impuesto cero", "Centros locales"],
      concretion: "Media",
      viability: "Media",
      risks: "Incentivos tributarios requieren reglas antiabuso; traslado institucional no garantiza resultados.",
      quote: "Propuestas de jóvenes para jóvenes enfocadas en resultados concretos."
    },
    jpp: {
      main: "Mi Primera Chamba, educación superior como derecho, 30 mil becas, Casa Futuro y apoyo a e-sports.",
      problem: "Exclusión educativa y laboral de jóvenes pobres, rurales, originarios, afrodescendientes y urbano-marginales.",
      instruments: ["Subsidio de S/ 6,150", "Banco de la Nación", "Reforma constitucional", "Casa Futuro"],
      concretion: "Alta",
      viability: "Media",
      risks: "No explica focalización, control de uso, interoperabilidad con empleadores ni sostenibilidad presupuestal.",
      quote: "100,000 jóvenes recibirán 6,150 soles en una cuenta individual."
    },
    tech: ["Educación digital", "Centros tecnológicos", "E-sports"]
  },
  {
    id: "agro",
    title: "Agricultura y Medio Ambiente",
    fpName: "Marco Vinelli",
    jppName: "César Guarniz",
    objective: "Comparar medidas sobre agricultura familiar, agua, riego, crédito, ambiente, minería ilegal y deforestación.",
    fp: {
      main: "Reactivar Pronamach, reservorios, maquinaria para juntas de usuarios, asistencia técnica y proyectos de riego.",
      problem: "Falta de agua, crédito, maquinaria, asistencia técnica y tecnología para pequeños agricultores.",
      instruments: ["Pronamach", "Núcleos ejecutores", "Maquinaria", "Asistencia técnica", "Drones y satélites"],
      concretion: "Media",
      viability: "Media-alta",
      risks: "Falta plan de mantenimiento, gobernanza local, metas ambientales y estrategia frente al REINFO.",
      quote: "Vamos a proteger nuestra Amazonía a través de la tecnología."
    },
    jpp: {
      main: "Fondo nacional del agua, banco de desarrollo agropecuario, compras públicas, MIDAGRI digitalizado y derogatoria antiforestal.",
      problem: "Agricultura familiar abandonada, bajos precios, falta de crédito y brecha de riego.",
      instruments: ["Banco agropecuario", "Compras públicas", "Fondo de agua", "Reforma de MIDAGRI", "Derogatoria legal"],
      concretion: "Media-alta",
      viability: "Media",
      risks: "Meta de un millón de productores en 100 días requiere padrón, financiamiento y control de mora.",
      quote: "Tenemos que reformar el MIDAGRI, un MIDAGRI moderno, digitalizado."
    },
    tech: ["Agrotecnología", "Drones", "Satélites", "Digitalización sectorial"]
  },
  {
    id: "infra",
    title: "Infraestructura",
    fpName: "Carlos Neuhaus",
    jppName: "Gustavo Guerra García",
    objective: "Contrastar propuestas de destrabe de obras, conectividad física, transporte urbano y prevención de desastres.",
    fp: {
      main: "Destrabar obras, prevenir desastres, ejecutar carreteras, puertos, aeropuertos y usar tecnología en licitaciones.",
      problem: "Obras paralizadas, mala gestión, infraestructura preventiva insuficiente y baja ejecución.",
      instruments: ["Destrabe contractual", "Nueva licitación", "Inversión privada", "Contratación digital", "Buses eléctricos"],
      concretion: "Media",
      viability: "Media-alta",
      risks: "Cortar contratos puede generar controversias; faltan criterios de priorización y control anticorrupción tecnológico.",
      quote: "La corrupción se puede prevenir con tecnología."
    },
    jpp: {
      main: "Corredores bioceánicos, ducto Camisea-Cusco, caminos rurales y transporte urbano subsidiado e inteligente.",
      problem: "Desconexión territorial, altos costos logísticos y transporte urbano deficiente.",
      instruments: ["Corredores estratégicos", "Proinversión", "Subsidios", "Núcleos ejecutores", "Sistemas inteligentes"],
      concretion: "Alta",
      viability: "Media",
      risks: "Cartera amplia exige priorización, estudios, licencias, financiamiento y gobernanza metropolitana.",
      quote: "Hay que subsidiar el transporte público y aumentar la velocidad con sistemas inteligentes."
    },
    tech: ["Sistemas inteligentes", "Contratación digital", "Transporte eléctrico", "Conectividad ausente"]
  },
  {
    id: "economia",
    title: "Economía y Empleo",
    fpName: "Luis Carranza",
    jppName: "Pedro Francke",
    objective: "Comparar rutas de crecimiento, inversión privada, formalización, crédito, estabilidad macro y empleo.",
    fp: {
      main: "Orden económico, BCR autónomo, equilibrio fiscal, inversión privada, garantías crediticias y capitalismo popular.",
      problem: "Pobreza, bajo crecimiento, caída de inversión privada e informalidad.",
      instruments: ["Regla fiscal", "Garantías de crédito", "Banco de desarrollo", "Inversión privada", "Programas sociales"],
      concretion: "Media",
      viability: "Media-alta",
      risks: "Crecimiento alto depende de confianza, ejecución pública y entorno externo; faltan costos sociales detallados.",
      quote: "Orden económico, capitalismo popular y orden social."
    },
    jpp: {
      main: "Crecimiento de 6%, derogatoria de leyes procrimen, S/ 15 mil millones en crédito barato y ciencia/tecnología.",
      problem: "Extorsión, falta de crédito, informalidad, bajo crecimiento y sobrecostos para pequeñas empresas.",
      instruments: ["Crédito barato", "Derogatoria legal", "BCR autónomo", "Fondo de combustibles", "Ciencia y tecnología"],
      concretion: "Media-alta",
      viability: "Media",
      risks: "Tensión entre crédito subsidiado, estabilidad fiscal y administración de riesgo financiero.",
      quote: "Una gran transformación tecnológica para que las pequeñas empresas lleguen a más mercados."
    },
    tech: ["Ciencia y tecnología", "Pymes", "Economía digital incipiente"]
  },
  {
    id: "salud",
    title: "Salud",
    fpName: "José Recoba",
    jppName: "Hernando Ceballos",
    objective: "Examinar propuestas sobre sistema sanitario, anemia, medicamentos, atención primaria, telemedicina y salud mental.",
    fp: {
      main: "Orden sanitario, trazabilidad de anemia, brigadas, vacunación, telemedicina y reasignación presupuestal.",
      problem: "Colapso sanitario, anemia, colas, falta de vacunas, infraestructura y medicamentos.",
      instruments: ["Mapeo casa por casa", "Telemedicina", "Brigadas", "Vacunación", "Reasignación de recursos"],
      concretion: "Media",
      viability: "Media",
      risks: "Trazabilidad sanitaria requiere datos personales, interoperabilidad, ciberseguridad y personal territorial.",
      quote: "Casa por casa, niño por niño, madre gestante por madre gestante."
    },
    jpp: {
      main: "Salud como derecho fundamental, sistema nacional de salud, atención primaria, medicamentos e historia clínica electrónica.",
      problem: "Sistema excluyente, gasto de bolsillo, falta de medicamentos, profesionales e infraestructura.",
      instruments: ["Sistema nacional de salud", "Atención primaria", "Historia clínica electrónica", "Telemedicina", "Medicamentos"],
      concretion: "Media",
      viability: "Media",
      risks: "Reforma estructural sin arquitectura financiera, interoperabilidad sanitaria ni protección de datos detallada.",
      quote: "La salud tiene que ser un derecho fundamental, gratuita y de calidad."
    },
    tech: ["Telemedicina", "Historia clínica electrónica", "Datos de salud", "Privacidad ausente"]
  }
];

const techItems = [
  { name: "IA", clarity: 1, risk: "No hubo política de IA; solo mención genérica.", impact: "Potencial alto, desarrollo casi nulo.", icon: Cpu },
  { name: "Gobierno digital", clarity: 3, risk: "FP habló de digitalizar tres niveles, pero sin estándares ni rectoría.", impact: "Alto para trámites y servicios.", icon: Network },
  { name: "Datos personales", clarity: 0, risk: "Omisión crítica ante telemedicina, historia clínica y trazabilidad social.", impact: "Alto riesgo jurídico e institucional.", icon: ShieldAlert },
  { name: "Ciberseguridad", clarity: 0, risk: "No se mencionó, pese a digitalización estatal y sanitaria.", impact: "Riesgo alto para servicios críticos.", icon: ShieldAlert },
  { name: "Conectividad", clarity: 1, risk: "El subtema quedó prácticamente sin desarrollo.", impact: "Clave para zonas rurales.", icon: RadioTower },
  { name: "Salud digital", clarity: 3, risk: "Telemedicina e historia clínica sin gobernanza de datos.", impact: "Alto si se implementa con interoperabilidad.", icon: Database },
  { name: "Innovación", clarity: 2, risk: "JPP mencionó ciencia y tecnología; faltan instrumentos.", impact: "Medio-alto para productividad.", icon: Activity },
  { name: "Tecnología ambiental", clarity: 3, risk: "Drones y satélites requieren capacidad operativa y judicialización.", impact: "Alto para Amazonía.", icon: Cpu }
];

const evaluation = [
  { criterio: "Claridad", FP: 3.8, JPP: 3.3 },
  { criterio: "Coherencia", FP: 3.3, JPP: 3.2 },
  { criterio: "Viabilidad", FP: 3.2, JPP: 3.0 },
  { criterio: "Sustento", FP: 3.1, JPP: 3.3 },
  { criterio: "Innovación", FP: 2.5, JPP: 2.8 },
  { criterio: "Tecnología", FP: 2.4, JPP: 2.5 },
  { criterio: "Implementación", FP: 3.4, JPP: 3.0 }
];

const wordData = [
  { term: "Perú / peruanos", count: 152 },
  { term: "Juventud", count: 83 },
  { term: "Estado", count: 56 },
  { term: "Salud", count: 56 },
  { term: "Gobierno", count: 42 },
  { term: "Agricultura", count: 42 },
  { term: "Inversión", count: 39 },
  { term: "Trabajo", count: 37 },
  { term: "Orden", count: 35 },
  { term: "Caos", count: 34 }
];

const gaps = [
  "Protección de datos personales",
  "Ciberseguridad",
  "Regulación de inteligencia artificial",
  "Identidad digital",
  "Interoperabilidad técnica y jurídica",
  "Compras públicas tecnológicas",
  "Datos abiertos y transparencia algorítmica",
  "Conectividad rural de última milla",
  "Indicadores verificables",
  "Costeo presupuestal"
];

const tabs = [
  { id: "comparativo", label: "Comparativo" },
  { id: "tecnologia", label: "Tecnología" },
  { id: "evaluacion", label: "Evaluación" },
  { id: "metodologia", label: "Metodología" },
  { id: "palabras", label: "Lenguaje" },
  { id: "preguntas", label: "Preguntas" }
];

const methodologyCriteria = [
  {
    id: "4.1",
    title: "Claridad",
    description: "Evalúa si la propuesta se entiende sin necesidad de inferir demasiado.",
    rows: [
      ["1", "Declaración vaga o puramente retórica"],
      ["2", "Idea general, sin acción precisa"],
      ["3", "Acción identificable, pero incompleta"],
      ["4", "Acción clara con problema y beneficiarios"],
      ["5", "Acción clara, con meta, instrumento y responsable"]
    ],
    examples: [
      "Ejemplo de baja claridad: “vamos a poner orden”.",
      "Ejemplo de mayor claridad: “100 mil jóvenes recibirán un monto determinado en una cuenta individual para capacitación, emprendimiento o subsidio salarial”."
    ]
  },
  {
    id: "4.2",
    title: "Coherencia interna",
    description: "Evalúa si la propuesta guarda relación lógica con el diagnóstico presentado.",
    rows: [
      ["1", "Diagnóstico y propuesta no se conectan"],
      ["2", "Conexión débil o contradictoria"],
      ["3", "Conexión parcial"],
      ["4", "Buena relación problema-solución"],
      ["5", "Diagnóstico, propuesta, instrumento y resultado están alineados"]
    ]
  },
  {
    id: "4.3",
    title: "Nivel de concreción",
    description: "Evalúa cuánto detalle operativo ofrece.",
    rows: [
      ["1", "Solo objetivo general"],
      ["2", "Menciona acción, sin instrumento"],
      ["3", "Menciona instrumento, pero sin metas ni responsable"],
      ["4", "Incluye instrumento, población o meta"],
      ["5", "Incluye instrumento, población, meta, plazo, responsable y fuente de financiamiento"]
    ]
  },
  {
    id: "4.4",
    title: "Viabilidad jurídica e institucional",
    description: "Evalúa si la propuesta puede ejecutarse dentro del marco normativo y competencial vigente.",
    rows: [
      ["1", "Incompatible con competencias o marco constitucional"],
      ["2", "Requiere reformas complejas no explicadas"],
      ["3", "Viable, pero con ajustes normativos relevantes"],
      ["4", "Viable dentro del marco actual con coordinación institucional"],
      ["5", "Claramente ejecutable con instrumentos existentes"]
    ],
    questions: [
      "¿El Ejecutivo tiene competencia para hacerlo?",
      "¿Requiere ley del Congreso?",
      "¿Requiere reforma constitucional?",
      "¿Compromete competencias regionales o municipales?",
      "¿Supone crear una entidad nueva?",
      "¿Puede implementarse vía decreto supremo, política nacional, programa presupuestal o modificación reglamentaria?"
    ]
  },
  {
    id: "4.5",
    title: "Viabilidad presupuestal",
    description: "Evalúa si la propuesta reconoce costos, fuente de financiamiento o restricciones fiscales.",
    rows: [
      ["1", "Promesa sin costo ni fuente"],
      ["2", "Alto costo sin explicación fiscal"],
      ["3", "Menciona fuente genérica o reasignación"],
      ["4", "Tiene fuente plausible, aunque no cuantificada"],
      ["5", "Tiene costo, fuente, plazo y sostenibilidad fiscal"]
    ]
  },
  {
    id: "4.6",
    title: "Sustento técnico",
    description: "Evalúa si la propuesta se apoya en datos, evidencia, experiencia previa o diagnóstico verificable.",
    rows: [
      ["1", "No tiene sustento"],
      ["2", "Usa afirmaciones generales"],
      ["3", "Usa algunos datos o ejemplos"],
      ["4", "Usa datos y experiencia institucional"],
      ["5", "Usa evidencia, línea base, metas e indicadores"]
    ]
  },
  {
    id: "4.7",
    title: "Riesgo de implementación",
    description: "Evalúa la probabilidad de que la propuesta falle por problemas de diseño o ejecución.",
    rows: [
      ["1", "Riesgo muy alto"],
      ["2", "Riesgo alto"],
      ["3", "Riesgo medio"],
      ["4", "Riesgo bajo"],
      ["5", "Riesgo muy bajo"]
    ],
    riskFactors: [
      "falta de presupuesto",
      "oposición legislativa",
      "ausencia de entidad responsable",
      "riesgo de corrupción",
      "duplicidad institucional",
      "baja capacidad regional o local",
      "plazos irreales",
      "litigios o arbitrajes",
      "resistencia burocrática",
      "falta de interoperabilidad tecnológica",
      "ausencia de datos confiables"
    ]
  }
];

const technologyCriteria = [
  ["Claridad tecnológica", "¿Se entiende qué tecnología se usaría y para qué?"],
  ["Gobernanza", "¿Quién administra el sistema, datos o plataforma?"],
  ["Interoperabilidad", "¿Se conecta con otros sistemas del Estado?"],
  ["Protección de datos", "¿Considera privacidad, consentimiento, seguridad o datos sensibles?"],
  ["Ciberseguridad", "¿Prevé riesgos de ataques, filtraciones o continuidad del servicio?"],
  ["Inclusión digital", "¿Llega a zonas rurales, personas vulnerables o sin conectividad?"],
  ["Sostenibilidad", "¿Hay presupuesto, mantenimiento y capacitación?"],
  ["Impacto", "¿Mejora servicios, reduce costos, tiempos o corrupción?"],
  ["Riesgo regulatorio", "¿Requiere norma, estándar, supervisión o autoridad responsable?"]
];

const technologyScale = [
  ["1", "Mención superficial de tecnología"],
  ["2", "Tecnología como herramienta genérica"],
  ["3", "Propuesta tecnológica identificable, pero incompleta"],
  ["4", "Propuesta con objetivo, entidad y uso definido"],
  ["5", "Propuesta con gobernanza, datos, seguridad, interoperabilidad, presupuesto e impacto"]
];

const finalWeights = [
  ["Claridad", "15%"],
  ["Coherencia", "15%"],
  ["Concreción", "20%"],
  ["Viabilidad jurídica/institucional", "15%"],
  ["Viabilidad presupuestal", "15%"],
  ["Sustento técnico", "10%"],
  ["Innovación / tecnología", "10%"]
];

const resultCategories = [
  ["4.5 - 5.0", "Muy sólida", "Propuesta clara, viable, costeada y técnicamente sustentada"],
  ["3.8 - 4.4", "Sólida", "Buena propuesta, con algunos vacíos menores"],
  ["3.0 - 3.7", "Moderada", "Tiene valor, pero requiere desarrollo"],
  ["2.0 - 2.9", "Débil", "Idea relevante, pero poco concreta o riesgosa"],
  ["1.0 - 1.9", "Retórica", "No alcanza estándar mínimo de política pública"]
];

const methodologyExamples = [
  ["Digitalización de la función pública en tres niveles", "4", "4", "3", "3", "2", "3", "3", "3.25"],
  ["Programa “Mi primera chamba”", "5", "4", "5", "3", "3", "3", "3", "3.85"],
  ["Uso de drones e imágenes satelitales contra tala ilegal", "4", "3", "3", "3", "2", "3", "4", "3.15"],
  ["Historia clínica electrónica y telemedicina", "4", "4", "3", "3", "2", "3", "4", "3.30"]
];

const neutralityRules = [
  "Se evalúa la propuesta, no la simpatía política del expositor.",
  "Las acusaciones cruzadas solo se consideran si inciden en viabilidad, coherencia o responsabilidad institucional.",
  "No se completa información faltante con supuestos.",
  "Toda inferencia debe separarse de los hechos observados.",
  "Las promesas sin mecanismo se califican como baja concreción.",
  "Las propuestas tecnológicas se evalúan con estándar reforzado por sus impactos en derechos, datos personales, seguridad e inclusión digital."
];

type Proposal = (typeof blocks)[number]["fp"];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[2rem] border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${className}`} style={style}>
      {children}
    </span>
  );
}

function ScorePill({ label, value }: { label: string; value: string }) {
  const tone =
    value === "Alta" || value === "Media-alta"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : value === "Media"
        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
        : "border-red-200 bg-red-50 text-red-700";

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>{label}: {value}</span>;
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white">
        <div className="text-2xl font-black tracking-tight" style={{ color: BLUE }}>IA</div>
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: YELLOW }} />
      </div>
      <div className="leading-none">
        <div className="text-2xl font-black tracking-tight text-white">IALAW</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/75">Digital Lawyers</div>
      </div>
    </div>
  );
}

function TeamCard({ title, data, color }: { title: string; data: Proposal; color: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 text-white" style={{ backgroundColor: color }}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-black uppercase">{title}</h3>
          <Scale className="h-7 w-7 text-white/70" />
        </div>
        <blockquote className="mt-5 border-l-4 pl-4 text-lg font-semibold text-white/90" style={{ borderColor: YELLOW }}>
          “{data.quote}”
        </blockquote>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <div className="text-xs font-black uppercase tracking-widest" style={{ color: GRAY }}>Propuesta principal</div>
          <p className="mt-1 text-lg font-bold leading-7">{data.main}</p>
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest" style={{ color: GRAY }}>Problema público</div>
          <p className="mt-1 text-slate-700">{data.problem}</p>
        </div>
        <div>
          <div className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: GRAY }}>Instrumentos</div>
          <div className="flex flex-wrap gap-2">
            {data.instruments.map((item) => <Badge key={item} className="border border-slate-200 text-slate-700">{item}</Badge>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ScorePill label="Concreción" value={data.concretion} />
          <ScorePill label="Viabilidad" value={data.viability} />
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-black uppercase" style={{ color: BLUE }}>
            <AlertTriangle className="h-4 w-4" /> Riesgos o vacíos
          </div>
          <p className="text-sm leading-6 text-slate-700">{data.risks}</p>
        </div>
      </div>
    </Card>
  );
}

export default function DebateTecnicoInteractivo() {
  const [selected, setSelected] = useState(blocks[0].id);
  const [view, setView] = useState("comparativo");
  const [query, setQuery] = useState("");

  const filteredBlocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blocks;
    return blocks.filter((block) => JSON.stringify(block).toLowerCase().includes(q));
  }, [query]);

  const current = blocks.find((block) => block.id === selected) || filteredBlocks[0] || blocks[0];

  return (
    <div className="min-h-screen bg-white text-slate-950" style={{ fontFamily: "Montserrat, Poppins, Avenir Next, system-ui, sans-serif" }}>
      <section className="relative overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/40" />
          <div className="absolute bottom-10 left-12 h-36 w-36 rounded-full border border-white/30" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
          <div className="absolute left-[58%] top-24 h-px w-80 bg-white/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <LogoMark />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white px-4 py-2 uppercase tracking-wide" style={{ color: BLUE }}>Debate técnico</Badge>
              <Badge className="px-4 py-2 uppercase tracking-wide text-slate-950" style={{ backgroundColor: YELLOW }}>Segunda vuelta</Badge>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <div className="mb-5 h-2 w-24 rounded-full" style={{ backgroundColor: YELLOW }} />
              <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
                Mapa interactivo del debate técnico presidencial
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
                Lectura comparativa, jurídico-regulatoria y tecnológica de las propuestas de Fuerza Popular y Juntos por el Perú, organizada por bloques, riesgos, vacíos y capacidad de implementación.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white p-5" style={{ color: BLUE }}>
                  <div className="text-4xl font-black">6</div>
                  <div className="text-xs font-bold uppercase tracking-wider">bloques</div>
                </div>
                <div className="rounded-3xl p-5 text-slate-950" style={{ backgroundColor: YELLOW }}>
                  <div className="text-4xl font-black">12</div>
                  <div className="text-xs font-bold uppercase tracking-wider">especialistas</div>
                </div>
                <div className="col-span-2 rounded-3xl border border-white/20 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Hallazgo central</div>
                  <div className="mt-2 text-2xl font-black uppercase leading-tight">La tecnología apareció como herramienta, no como política integral.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="sticky top-0 z-20 -mx-6 border-b bg-white/95 px-6 py-4 backdrop-blur lg:-mx-10 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 lg:grid-cols-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setView(tab.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${view === tab.id ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                  style={view === tab.id ? { color: BLUE } : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar tema, riesgo o propuesta"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-600 sm:w-72"
                />
              </div>
              <select
                value={current.id}
                onChange={(event) => setSelected(event.target.value)}
                className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-600 sm:w-72"
              >
                {filteredBlocks.map((block) => <option key={block.id} value={block.id}>{block.title}</option>)}
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "comparativo" && (
            <motion.section key="comparativo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em]" style={{ color: BLUE }}>
                    <Vote className="h-4 w-4" /> Bloque seleccionado
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">{current.title}</h2>
                  <p className="mt-3 max-w-3xl text-slate-600">{current.objective}</p>
                </div>
                <div className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-950" style={{ backgroundColor: PALE_YELLOW }}>
                  FP: {current.fpName} · JPP: {current.jppName}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <TeamCard title="Fuerza Popular" data={current.fp} color={BLUE} />
                <TeamCard title="Juntos por el Perú" data={current.jpp} color={DEEP_BLUE} />
              </div>

              <Card className="mt-6 bg-slate-50">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: BLUE }}>Lectura tecnológica del bloque</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {current.tech.map((item) => <Badge key={item} className="text-slate-950" style={{ backgroundColor: YELLOW }}>{item}</Badge>)}
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600">
                    El debate muestra menciones útiles, pero casi nunca desarrolla arquitectura institucional, estándares, protección de datos, ciberseguridad, financiamiento ni métricas verificables.
                  </p>
                </div>
              </Card>
            </motion.section>
          )}

          {view === "tecnologia" && (
            <motion.section key="tecnologia" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="mb-8">
                <div className="mb-3 h-2 w-20 rounded-full" style={{ backgroundColor: YELLOW }} />
                <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Foco especial en tecnología</h2>
                <p className="mt-3 max-w-4xl text-slate-600">
                  La tecnología aparece como solución puntual: trámites, telemedicina, historia clínica, drones, satélites, licitaciones y sistemas inteligentes. La ausencia común es una política transversal de datos, seguridad e inteligencia artificial.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {techItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.name} className="transition hover:-translate-y-1 hover:shadow-lg">
                      <div className="p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: BLUE }}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="rounded-full px-3 py-1 text-xs font-black text-slate-950" style={{ backgroundColor: YELLOW }}>
                            Claridad {item.clarity}/5
                          </div>
                        </div>
                        <h3 className="text-xl font-black uppercase">{item.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600"><strong>Riesgo:</strong> {item.risk}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600"><strong>Impacto:</strong> {item.impact}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8 overflow-hidden rounded-[2rem] p-8 text-white shadow-sm" style={{ backgroundColor: BLUE }}>
                <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                  <div>
                    <div className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-white/70">Radar de ausencias</div>
                    <h3 className="text-3xl font-black uppercase leading-tight">Lo que no se dijo también importa</h3>
                    <p className="mt-4 text-white/80">
                      Digitalizar sin gobernanza de datos es como construir autopistas sin reglas de tránsito: parece avance, pero aumenta el riesgo sistémico.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {gaps.map((gap) => (
                      <div key={gap} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                        <ShieldAlert className="h-4 w-4" style={{ color: YELLOW }} />
                        <span className="text-sm font-semibold">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {view === "evaluacion" && (
            <motion.section key="evaluacion" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
                <Card>
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em]" style={{ color: BLUE }}>
                      <BarChart3 className="h-4 w-4" /> Escala 1 a 5
                    </div>
                    <h2 className="text-4xl font-black uppercase">Evaluación comparativa</h2>
                    <div className="mt-6 h-[420px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={evaluation} outerRadius="75%">
                          <PolarGrid />
                          <PolarAngleAxis dataKey="criterio" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 5]} />
                          <Radar name="FP" dataKey="FP" stroke={BLUE} fill={BLUE} fillOpacity={0.25} />
                          <Radar name="JPP" dataKey="JPP" stroke={YELLOW} fill={YELLOW} fillOpacity={0.35} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  <div className="rounded-[2rem] p-6 text-white shadow-sm" style={{ backgroundColor: BLUE }}>
                    <div className="text-sm font-black uppercase tracking-[0.25em] text-white/70">Resultado técnico agregado</div>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="rounded-3xl bg-white p-5" style={{ color: BLUE }}>
                        <div className="text-5xl font-black">3.1</div>
                        <div className="font-bold uppercase">FP</div>
                      </div>
                      <div className="rounded-3xl p-5 text-slate-950" style={{ backgroundColor: YELLOW }}>
                        <div className="text-5xl font-black">3.0</div>
                        <div className="font-bold uppercase">JPP</div>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-white/80">
                      La diferencia es marginal. FP comunicó mejor su eje de gestión; JPP ofreció diagnósticos estructurales y algunas propuestas más específicas, pero con mayor reto fiscal e institucional.
                    </p>
                  </div>

                  {evaluation.map((row) => (
                    <div key={row.criterio} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex justify-between text-sm font-black uppercase">
                        <span>{row.criterio}</span>
                        <span>FP {row.FP} · JPP {row.JPP}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full" style={{ width: `${row.FP * 20}%`, backgroundColor: BLUE }} />
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full" style={{ width: `${row.JPP * 20}%`, backgroundColor: YELLOW }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {view === "metodologia" && (
            <motion.section key="metodologia" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="mb-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em]" style={{ color: BLUE }}>
                    <BookOpen className="h-4 w-4" /> Metodología
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Criterios de evaluación del discurso</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Cada propuesta se evalúa con siete criterios principales. Las menciones tecnológicas se revisan además con una matriz específica de gobernanza, datos, seguridad, interoperabilidad e impacto.
                </p>
              </div>

              <section className="space-y-5">
                <h3 className="text-2xl font-black uppercase" style={{ color: BLUE }}>4. Criterios de evaluación</h3>
                <div className="grid gap-5 lg:grid-cols-2">
                  {methodologyCriteria.map((criterion) => (
                    <MethodCriterionCard key={criterion.id} criterion={criterion} />
                  ))}
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-2xl font-black uppercase" style={{ color: BLUE }}>5. Criterios especiales para propuestas tecnológicas</h3>
                <Card>
                  <div className="p-6">
                    <p className="mb-5 text-sm leading-6 text-slate-600">Toda mención vinculada a tecnología debe evaluarse con una matriz adicional.</p>
                    <ResponsiveTable
                      headers={["Criterio tecnológico", "Pregunta guía"]}
                      rows={technologyCriteria}
                    />
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <h4 className="mb-4 text-xl font-black uppercase">Escala tecnológica</h4>
                    <ResponsiveTable headers={["Puntaje", "Descripción"]} rows={technologyScale} />
                  </div>
                </Card>
              </section>

              <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <Card>
                  <div className="p-6">
                    <h3 className="mb-4 text-2xl font-black uppercase" style={{ color: BLUE }}>6. Matriz de calificación final</h3>
                    <p className="mb-5 text-sm leading-6 text-slate-600">Cada equipo se evalúa por bloque y luego en promedio general.</p>
                    <ResponsiveTable headers={["Criterio", "Peso sugerido"]} rows={finalWeights} />
                    <p className="mt-4 text-sm font-black uppercase">Total: 100%</p>
                  </div>
                </Card>

                <div className="rounded-[2rem] p-6 text-white shadow-sm" style={{ backgroundColor: BLUE }}>
                  <h3 className="text-2xl font-black uppercase">Fórmula simple</h3>
                  <p className="mt-3 text-sm leading-6 text-white/80">Puntaje final por propuesta:</p>
                  <div className="mt-4 overflow-x-auto rounded-2xl bg-white/10 p-4">
                    <code className="whitespace-nowrap text-sm font-bold text-white">
                      Puntaje = (Claridad x 0.15) + (Coherencia x 0.15) + (Concreción x 0.20) + (Viabilidad institucional x 0.15) + (Viabilidad presupuestal x 0.15) + (Sustento técnico x 0.10) + (Innovación x 0.10)
                    </code>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/80">La nota final se expresa en escala de 1 a 5.</p>
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-2xl font-black uppercase" style={{ color: BLUE }}>7. Categorías de resultado</h3>
                <Card>
                  <div className="p-6">
                    <ResponsiveTable headers={["Puntaje final", "Categoría", "Interpretación"]} rows={resultCategories} />
                  </div>
                </Card>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-2xl font-black uppercase" style={{ color: BLUE }}>8. Ejemplo de aplicación</h3>
                <Card>
                  <div className="p-6">
                    <ResponsiveTable
                      headers={[
                        "Propuesta",
                        "Claridad",
                        "Coherencia",
                        "Concreción",
                        "Viabilidad institucional",
                        "Viabilidad presupuestal",
                        "Sustento técnico",
                        "Innovación",
                        "Resultado"
                      ]}
                      rows={methodologyExamples}
                    />
                  </div>
                </Card>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-2xl font-black uppercase" style={{ color: BLUE }}>9. Reglas de neutralidad</h3>
                <div className="rounded-[2rem] p-6 text-white shadow-sm" style={{ backgroundColor: BLUE }}>
                  <p className="mb-5 text-sm font-semibold leading-6 text-white/80">Para mantener neutralidad técnica:</p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {neutralityRules.map((rule) => (
                      <li key={rule} className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-6">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: YELLOW }} />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </motion.section>
          )}

          {view === "palabras" && (
            <motion.section key="palabras" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="mb-8">
                <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Lenguaje y énfasis discursivo</h2>
                <p className="mt-3 max-w-4xl text-slate-600">
                  Se agruparon términos equivalentes y se excluyeron palabras vacías. Los resultados son aproximados por errores de transcripción y ruido de transmisión.
                </p>
              </div>

              <Card>
                <div className="p-6">
                  <div className="h-[420px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wordData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="term" type="category" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                          {wordData.map((entry, index) => <Cell key={entry.term} fill={index % 2 === 0 ? BLUE : YELLOW} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase" style={{ color: BLUE }}>Fuerza Popular</h3>
                    <p className="mt-3 text-slate-600">Predomina la estructura emocional “orden versus caos”, acompañada de Estado, inversión, trabajo, juventud y salud.</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase" style={{ color: BLUE }}>Juntos por el Perú</h3>
                    <p className="mt-3 text-slate-600">Predomina la lectura político-institucional: Estado, Congreso, derechos, corrupción, agricultura, agua y salud.</p>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}

          {view === "preguntas" && (
            <motion.section key="preguntas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="py-10">
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em]" style={{ color: BLUE }}>
                  <FileQuestion className="h-4 w-4" /> Segunda ronda
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Preguntas que faltan</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <QuestionCard
                  title="A Fuerza Popular"
                  questions={[
                    "¿Qué entidad lideraría el centro de gobierno estratégico?",
                    "¿Qué servicios digitales priorizarían en los primeros 100 días?",
                    "¿Qué estándares de interoperabilidad, identidad digital y protección de datos aplicarían?",
                    "¿Cuál sería el costo fiscal del impuesto cero para jóvenes?",
                    "¿Cómo auditarían la tecnología usada en licitaciones públicas?",
                    "¿Cuál es su política nacional de ciberseguridad?"
                  ]}
                />
                <QuestionCard
                  title="A Juntos por el Perú"
                  questions={[
                    "¿Cómo se financiaría Mi Primera Chamba y cómo evitarían filtraciones?",
                    "¿Qué costo fiscal tendría reconocer la educación superior como derecho?",
                    "¿Cómo funcionaría el banco de desarrollo agropecuario sin captura política?",
                    "¿Qué artículos derogarían de la llamada ley antiforestal?",
                    "¿Qué arquitectura tendría la historia clínica electrónica nacional?",
                    "¿Cuál es su propuesta sobre inteligencia artificial en el Estado?"
                  ]}
                />
              </div>

              <div className="mt-6 rounded-[2rem] p-6 text-slate-950" style={{ backgroundColor: YELLOW }}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7" />
                    <div>
                      <div className="font-black uppercase">Criterio editorial</div>
                      <div className="text-sm">Separar hechos, inferencias y opinión analítica evita convertir el debate técnico en propaganda con gráficos bonitos.</div>
                    </div>
                  </div>
                  <button type="button" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
                    Usar como guía de entrevista
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function QuestionCard({ title, questions }: { title: string; questions: string[] }) {
  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-5 text-2xl font-black uppercase" style={{ color: BLUE }}>{title}</h3>
        <ol className="space-y-3">
          {questions.map((question, index) => (
            <li key={question} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
              <span className="font-black" style={{ color: BLUE }}>{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm text-slate-700">{question}</span>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}

function MethodCriterionCard({ criterion }: { criterion: (typeof methodologyCriteria)[number] }) {
  return (
    <Card>
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h4 className="text-xl font-black uppercase">{criterion.id} {criterion.title}</h4>
          <span className="rounded-full px-3 py-1 text-xs font-black text-slate-950" style={{ backgroundColor: YELLOW }}>
            1 a 5
          </span>
        </div>
        <p className="mb-5 text-sm leading-6 text-slate-600">{criterion.description}</p>
        <ResponsiveTable headers={["Puntaje", "Descripción"]} rows={criterion.rows} />

        {"examples" in criterion && criterion.examples ? (
          <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {criterion.examples.map((example) => <p key={example}>{example}</p>)}
          </div>
        ) : null}

        {"questions" in criterion && criterion.questions ? (
          <MethodList title="Preguntas guía" items={criterion.questions} />
        ) : null}

        {"riskFactors" in criterion && criterion.riskFactors ? (
          <MethodList title="Factores de riesgo" items={criterion.riskFactors} columns />
        ) : null}
      </div>
    </Card>
  );
}

function MethodList({ title, items, columns = false }: { title: string; items: string[]; columns?: boolean }) {
  return (
    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
      <h5 className="mb-3 text-sm font-black uppercase" style={{ color: BLUE }}>{title}</h5>
      <ul className={`grid gap-2 ${columns ? "sm:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: YELLOW }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              {headers.map((header) => (
                <th key={header} className="border-b border-slate-200 p-3 font-black uppercase tracking-wide text-slate-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row.join("-")}-${rowIndex}`} className="border-b border-slate-200 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`p-3 align-top leading-6 ${cellIndex === 0 ? "font-bold text-slate-950" : "text-slate-700"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
