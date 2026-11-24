import React, { useMemo, useState } from "react";
import {
  SafeAreaView, View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, Alert, StatusBar
} from "react-native";

type Tab = "Inicio" | "Calendario" | "Notas" | "Profes" | "Perfil";
type Grade = { id: number; subject: string; title: string; value: number; weight: number; date: string };
const RED = "#D92736", DARK = "#292C31", MUTED = "#737981", BG = "#F3F4F6";
const initialGrades: Grade[] = [
  {id:1, subject:"Matemática", title:"Prueba 1", value:7.0, weight:100, date:"10 nov"},
  {id:2, subject:"Matemática", title:"Prueba 2", value:7.0, weight:100, date:"14 nov"},
  {id:3, subject:"Matemática", title:"Trabajo", value:5.4, weight:100, date:"17 nov"},
  {id:4, subject:"Matemática", title:"Prueba 3", value:6.4, weight:100, date:"19 nov"},
  {id:5, subject:"Matemática", title:"Control", value:6.2, weight:100, date:"21 nov"},
  {id:6, subject:"Matemática", title:"Prueba 4", value:3.4, weight:100, date:"24 nov"},
  {id:7, subject:"Lenguaje", title:"Ensayo", value:6.4, weight:100, date:"18 nov"},
  {id:8, subject:"Historia", title:"Control", value:5.7, weight:100, date:"20 nov"}
];
const subjects = ["Matemática","Lenguaje","Historia","Ciencias","Inglés","Educación Física","Electivo"];

function average(items: Grade[]) {
  if (!items.length) return "—";
  const weighted = items.some(g => g.weight !== 100);
  const totalWeight = items.reduce((s,g)=>s+g.weight,0);
  const result = weighted
    ? items.reduce((s,g)=>s+g.value*g.weight,0) / totalWeight
    : items.reduce((s,g)=>s+g.value,0) / items.length;
  return result.toFixed(1).replace(".",",");
}
function Card({children, style}: any) { return <View style={[styles.card,style]}>{children}</View>; }
function SectionTitle({children, right}: any) { return <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{children}</Text>{right}</View>; }
function Pill({children, color=RED}: any) { return <View style={[styles.pill,{backgroundColor:color+"18"}]}><Text style={{color,fontWeight:"700",fontSize:11}}>{children}</Text></View>; }

export default function App() {
  const [tab,setTab] = useState<Tab>("Inicio");
  const [role,setRole] = useState<"Estudiante"|"Profesor">("Estudiante");
  const [grades,setGrades] = useState<Grade[]>(initialGrades);
  const [subject,setSubject] = useState("Matemática");
  const [gradeValue,setGradeValue] = useState("6.0");
  const [gradeTitle,setGradeTitle] = useState("Nueva evaluación");
  const [weight,setWeight] = useState("100");
  const [name,setName] = useState("Estudiante Nahuelcura");
  const [course,setCourse] = useState("3° Medio A");
  const [email,setEmail] = useState("estudiante@nahuelcura.cl");
  const [messageIndex,setMessageIndex] = useState(0);
  const messages = [
    "Tu promedio no define quién eres. Tienes talentos y capacidades que merecen ser reconocidos. Sigue avanzando a tu ritmo.",
    "No te compares con los demás. Tu camino es único; concéntrate en ser mejor que ayer.",
    "Los grandes logros también comienzan con pequeños pasos. Tu esfuerzo importa.",
    "Nunca permitas que alguien apague tu brillo. Tu forma de aprender y destacar también tiene valor."
  ];
  const general = useMemo(() => {
    const avgs = subjects.map(s => grades.filter(g=>g.subject===s)).filter(a=>a.length).map(a=>Number(average(a).replace(",",".")));
    return avgs.length ? (avgs.reduce((a,b)=>a+b,0)/avgs.length).toFixed(1).replace(".",",") : "—";
  },[grades]);
  const addGrade = () => {
    const v = Number(gradeValue.replace(",","."));
    const w = Number(weight);
    if (!Number.isFinite(v) || v < 1 || v > 7) return Alert.alert("Nota inválida","Ingresa una nota entre 1,0 y 7,0.");
    if (!Number.isFinite(w) || w <= 0 || w > 100) return Alert.alert("Ponderación inválida","Ingresa un porcentaje entre 1 y 100.");
    if (grades.filter(g=>g.subject===subject).some(g=>g.weight!==100) && grades.filter(g=>g.subject===subject).reduce((s,g)=>s+g.weight,0)+w>100)
      return Alert.alert("Ponderación excedida","Las ponderaciones de esta asignatura superarían el 100%.");
    setGrades(prev=>[...prev,{id:Date.now(),subject,title:gradeTitle,value:v,weight:w,date:"Hoy"}]);
    Alert.alert("Nota publicada","La calificación se agregó al registro de demostración.");
  };
  const deleteGrade = (id:number) => Alert.alert("Eliminar nota","¿Quieres quitar esta nota del prototipo?",[
    {text:"Cancelar",style:"cancel"},{text:"Eliminar",style:"destructive",onPress:()=>setGrades(prev=>prev.filter(g=>g.id!==id))}
  ]);
  const subjectGrades = grades.filter(g=>g.subject===subject);
  const renderHome = () => <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.hero}>
      <View style={styles.logoMark}><Text style={styles.logoMarkText}>N</Text></View>
      <View style={{flex:1}}><Text style={styles.brand}>NAHUELCURA</Text><Text style={styles.brandRed}>CONNECT</Text><Text style={styles.tagline}>Tu colegio, siempre contigo.</Text></View>
    </View>
    <Text style={styles.eyebrow}>BIENVENIDO/A</Text><Text style={styles.h1}>Hola, {name.split(" ")[0]} 👋</Text>
    <Card style={styles.redCard}><Text style={styles.whiteSmall}>TU RESUMEN ACADÉMICO</Text><View style={styles.summaryRow}><View><Text style={styles.whiteSmall}>Promedio general referencial</Text><Text style={styles.bigWhite}>{general}</Text></View><Pill color="#FFFFFF">Ver notas</Pill></View><Text style={styles.whiteSmall}>Cálculo demostrativo con las asignaturas que tienen notas cargadas.</Text></Card>
    <SectionTitle>Próximamente</SectionTitle>
    <Card><View style={styles.eventRow}><View style={styles.dateBox}><Text style={styles.dateDay}>26</Text><Text style={styles.dateMonth}>NOV</Text></View><View style={{flex:1}}><Text style={styles.cardTitle}>Actividad de comunidad</Text><Text style={styles.muted}>Evento de ejemplo · Información por confirmar</Text></View><Pill color="#65717D">Evento</Pill></View></Card>
    <SectionTitle>Comunicados</SectionTitle>
    <Card><Text style={styles.cardTitle}>Bienvenido a Nahuelcura Connect</Text><Text style={styles.muted}>Este prototipo muestra cómo se organizarán los avisos, calendario y herramientas académicas del colegio.</Text></Card>
    <TouchableOpacity style={styles.outlineButton} onPress={()=>setMessageIndex((messageIndex+1)%messages.length)}><Text style={styles.outlineText}>Ver otro mensaje positivo ♥</Text></TouchableOpacity>
  </ScrollView>;
  const renderCalendar = () => <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.h1}>Calendario</Text><Text style={styles.muted}>{course} · Ejemplo de actividades</Text>
    {[["26 NOV","Actividad de comunidad","Evento institucional"],["28 NOV","Evaluación de Matemática","Fecha de ejemplo"],["02 DIC","Entrega de trabajo","Fecha de ejemplo"]].map((e,i)=><Card key={i}><View style={styles.eventRow}><View style={styles.dateBox}><Text style={styles.dateDay}>{e[0].split(" ")[0]}</Text><Text style={styles.dateMonth}>{e[0].split(" ")[1]}</Text></View><View style={{flex:1}}><Text style={styles.cardTitle}>{e[1]}</Text><Text style={styles.muted}>{e[2]}</Text></View><Pill color={i===1?RED:"#64748B"}>{i===1?"Prueba":"Evento"}</Pill></View></Card>)}
    <Text style={styles.note}>Las fechas mostradas son demostrativas y no corresponden al calendario oficial del colegio.</Text>
  </ScrollView>;
  const renderGrades = () => <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.h1}>Calificaciones</Text><Text style={styles.muted}>{course} · Notas de demostración</Text>
    <Card style={styles.redCard}><Text style={styles.whiteSmall}>PROMEDIO GENERAL REFERENCIAL</Text><Text style={styles.bigWhite}>{general}</Text><Text style={styles.whiteSmall}>Promedio simple de asignaturas con notas cargadas.</Text></Card>
    {subjects.filter(s=>grades.some(g=>g.subject===s)).map(s=><TouchableOpacity key={s} onPress={()=>setSubject(s)}><Card style={subject===s?styles.selectedCard:undefined}><View style={styles.summaryRow}><View><Text style={styles.cardTitle}>{s}</Text><Text style={styles.muted}>{grades.filter(g=>g.subject===s).length} evaluaciones</Text></View><Text style={styles.average}>{average(grades.filter(g=>g.subject===s))}</Text></View></Card></TouchableOpacity>)}
    <SectionTitle>{subject} · Detalle</SectionTitle>
    {subjectGrades.map(g=><Card key={g.id}><View style={styles.summaryRow}><View style={{flex:1}}><Text style={styles.cardTitle}>{g.title}</Text><Text style={styles.muted}>{g.date} · Ponderación {g.weight}%</Text></View><Text style={styles.average}>{g.value.toFixed(1).replace(".",",")}</Text>{role==="Profesor"&&<TouchableOpacity onPress={()=>deleteGrade(g.id)}><Text style={styles.delete}>✕</Text></TouchableOpacity>}</View></Card>)}
    <Text style={styles.note}>El promedio ponderado se calcula con los porcentajes configurados. En modo simple, todas las notas valen lo mismo.</Text>
    {role==="Profesor"&&<Card><Text style={styles.cardTitle}>Agregar calificación (demo)</Text><TextInput style={styles.input} value={gradeTitle} onChangeText={setGradeTitle} placeholder="Nombre de evaluación"/><TextInput style={styles.input} value={gradeValue} onChangeText={setGradeValue} keyboardType="decimal-pad" placeholder="Nota (1,0 a 7,0)"/><TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="number-pad" placeholder="Ponderación % (100 = simple)"/><Text style={styles.muted}>Asignatura seleccionada: {subject}</Text><TouchableOpacity style={styles.primaryButton} onPress={addGrade}><Text style={styles.primaryText}>Publicar nota</Text></TouchableOpacity></Card>}
  </ScrollView>;
  const renderTeachers = () => <ScrollView contentContainerStyle={styles.content}><Text style={styles.h1}>Profesores</Text><Text style={styles.muted}>Directorio de ejemplo · Contactos oficiales por incorporar</Text>{["Profesor/a de Matemática","Profesor/a de Lenguaje","Profesor/a de Historia","Profesor/a de Ciencias"].map((p,i)=><Card key={p}><View style={styles.eventRow}><View style={styles.avatarSmall}><Text style={styles.avatarText}>{p.slice(0,1)}</Text></View><View style={{flex:1}}><Text style={styles.cardTitle}>{p}</Text><Text style={styles.muted}>Correo institucional no configurado</Text></View><Pill color="#64748B">Demo</Pill></View></Card>)}</ScrollView>;
  const renderProfile = () => <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.h1}>Mi perfil</Text>
    <Card style={{alignItems:"center",paddingVertical:22}}><View style={styles.avatar}><Text style={styles.avatarText}>N</Text></View><Text style={styles.profileName}>{name}</Text><Text style={styles.muted}>{course} · Colegio Nahuelcura Machalí</Text><View style={styles.profileAverage}><Text style={styles.whiteSmall}>PROMEDIO GENERAL REFERENCIAL</Text><Text style={styles.bigWhite}>{general}</Text></View></Card>
    <Card style={styles.motivation}><Text style={styles.cardTitle}>♥ Un mensaje para ti</Text><Text style={styles.motivationText}>{messages[messageIndex]}</Text><TouchableOpacity onPress={()=>setMessageIndex((messageIndex+1)%messages.length)}><Text style={styles.link}>Leer otro mensaje →</Text></TouchableOpacity></Card>
    <SectionTitle>Mis insignias</SectionTitle><View style={styles.badgeGrid}>{[["🏆","Excelencia académica"],["🥇","Logro CORE"],["⭐","Perseverancia"],["🎤","Debate destacado"],["🏅","Deporte"],["❤️","Compañerismo"]].map(([emoji,label])=><View key={label} style={styles.badgeItem}><Text style={{fontSize:27}}>{emoji}</Text><Text style={styles.badgeLabel}>{label}</Text></View>)}</View><Text style={styles.note}>Insignias ilustrativas. En la versión oficial solo aparecerán reconocimientos otorgados por personal autorizado.</Text>
    <SectionTitle>Editar perfil (demo)</SectionTitle><Card><Text style={styles.label}>Nombre</Text><TextInput style={styles.input} value={name} onChangeText={setName}/><Text style={styles.label}>Curso</Text><TextInput style={styles.input} value={course} onChangeText={setCourse}/><Text style={styles.label}>Correo</Text><TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/><TouchableOpacity style={styles.outlineButton} onPress={()=>Alert.alert("Prototipo","En la versión conectada se habilitará el cambio seguro de contraseña y fotografía.")}><Text style={styles.outlineText}>Foto y contraseña</Text></TouchableOpacity></Card>
  </ScrollView>;
  const content = tab==="Inicio"?renderHome():tab==="Calendario"?renderCalendar():tab==="Notas"?renderGrades():tab==="Profes"?renderTeachers():renderProfile();
  const tabs: Tab[] = ["Inicio","Calendario","Notas","Profes","Perfil"];
  const icons: Record<Tab,string> = {Inicio:"⌂",Calendario:"▦",Notas:"▤",Profes:"✉",Perfil:"○"};
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content"/><View style={styles.topbar}><View><Text style={styles.topBrand}>NAHUELCURA <Text style={{color:RED}}>CONNECT</Text></Text><Text style={styles.topSub}>COLEGIO NAHUELCURA MACHALÍ</Text></View><TouchableOpacity style={styles.roleSwitch} onPress={()=>setRole(role==="Estudiante"?"Profesor":"Estudiante")}><Text style={styles.roleText}>{role==="Estudiante"?"Vista estudiante":"Vista profesor"} ↻</Text></TouchableOpacity></View>{content}<View style={styles.nav}>{tabs.map(t=><TouchableOpacity key={t} onPress={()=>setTab(t)} style={styles.navItem}><Text style={[styles.navIcon,{color:tab===t?RED:MUTED}]}>{icons[t]}</Text><Text style={[styles.navLabel,{color:tab===t?RED:MUTED,fontWeight:tab===t?"800":"500"}]}>{t}</Text></TouchableOpacity>)}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:BG},topbar:{backgroundColor:"#fff",paddingHorizontal:18,paddingTop:12,paddingBottom:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#E6E7E9"},
 topBrand:{fontSize:16,fontWeight:"900",color:DARK,letterSpacing:1},topSub:{fontSize:9,color:MUTED,letterSpacing:1.2,marginTop:3},roleSwitch:{backgroundColor:"#FCEBED",paddingHorizontal:10,paddingVertical:8,borderRadius:20},roleText:{fontSize:10,color:RED,fontWeight:"800"},
 content:{padding:17,paddingBottom:30},hero:{backgroundColor:DARK,borderRadius:18,padding:18,flexDirection:"row",alignItems:"center",marginBottom:22},logoMark:{width:54,height:54,borderRadius:15,backgroundColor:RED,alignItems:"center",justifyContent:"center",marginRight:13},logoMarkText:{fontSize:31,color:"#fff",fontWeight:"900"},brand:{color:"#fff",fontWeight:"900",fontSize:17,letterSpacing:1.3},brandRed:{color:"#F15A64",fontWeight:"900",fontSize:19,letterSpacing:2},tagline:{color:"#D3D6DA",fontSize:10,marginTop:3},
 eyebrow:{fontSize:10,color:RED,fontWeight:"900",letterSpacing:1.4},h1:{fontSize:27,fontWeight:"900",color:DARK,marginTop:4,marginBottom:5},muted:{color:MUTED,fontSize:12,lineHeight:18},card:{backgroundColor:"#fff",borderRadius:16,padding:15,marginTop:11,borderWidth:1,borderColor:"#E9EAEC"},redCard:{backgroundColor:DARK,borderColor:DARK},whiteSmall:{color:"#E1E3E5",fontSize:10,fontWeight:"700",letterSpacing:.5},summaryRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},bigWhite:{fontSize:34,color:"#fff",fontWeight:"900",marginVertical:3},sectionRow:{marginTop:22,marginBottom:2,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},sectionTitle:{fontSize:17,color:DARK,fontWeight:"900"},eventRow:{flexDirection:"row",alignItems:"center",gap:12},dateBox:{width:49,height:49,borderRadius:12,backgroundColor:"#FCEBED",alignItems:"center",justifyContent:"center"},dateDay:{fontSize:19,fontWeight:"900",color:RED},dateMonth:{fontSize:9,fontWeight:"800",color:RED},cardTitle:{fontSize:14,fontWeight:"800",color:DARK,marginBottom:3},pill:{paddingHorizontal:9,paddingVertical:6,borderRadius:30},note:{fontSize:11,color:MUTED,lineHeight:17,marginTop:12},outlineButton:{borderWidth:1,borderColor:RED,borderRadius:12,padding:13,alignItems:"center",marginTop:13},outlineText:{color:RED,fontWeight:"800",fontSize:12},selectedCard:{borderColor:RED,borderWidth:1.5},average:{fontSize:24,color:RED,fontWeight:"900"},delete:{color:RED,fontSize:18,paddingLeft:8},input:{backgroundColor:"#F5F6F7",borderWidth:1,borderColor:"#E3E5E7",borderRadius:10,paddingHorizontal:12,paddingVertical:11,marginTop:9,color:DARK},primaryButton:{backgroundColor:RED,borderRadius:12,padding:14,alignItems:"center",marginTop:13},primaryText:{color:"#fff",fontWeight:"900"},avatarSmall:{width:42,height:42,borderRadius:21,backgroundColor:"#FCEBED",alignItems:"center",justifyContent:"center"},avatar:{width:82,height:82,borderRadius:41,backgroundColor:RED,alignItems:"center",justifyContent:"center",marginBottom:10},avatarText:{fontSize:25,fontWeight:"900",color:"#fff"},profileName:{fontSize:19,fontWeight:"900",color:DARK},profileAverage:{backgroundColor:DARK,borderRadius:13,padding:15,alignItems:"center",width:"100%",marginTop:17},motivation:{backgroundColor:"#FFF5F5",borderColor:"#F5D4D7"},motivationText:{fontSize:13,color:DARK,lineHeight:20,marginTop:9},link:{fontSize:12,color:RED,fontWeight:"800",marginTop:12},badgeGrid:{flexDirection:"row",flexWrap:"wrap",gap:9,marginTop:10},badgeItem:{width:"31%",backgroundColor:"#fff",borderRadius:13,padding:10,alignItems:"center",borderWidth:1,borderColor:"#E9EAEC"},badgeLabel:{fontSize:10,color:DARK,textAlign:"center",fontWeight:"700",marginTop:5},label:{fontSize:11,color:MUTED,fontWeight:"800",marginTop:8},nav:{height:66,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#E4E5E7",flexDirection:"row",justifyContent:"space-around",alignItems:"center"},navItem:{flex:1,alignItems:"center",justifyContent:"center",gap:3},navIcon:{fontSize:23,fontWeight:"700"},navLabel:{fontSize:10}
});