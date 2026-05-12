```dataviewjs
// Seznam tvých zkoušek a jejich data (ve formátu RRRR-MM-DD)
const exams = [
    { name: "Český jazyk slohová práce", date: "2026-04-14" },
    { name: "Praktická zkouška", date: "2026-04-22" },
    { name: "Matematika", date: "2026-05-04" },
    { name: "Český jazyk didaktický test", date: "2026-05-05" },
    { name: "Matematika +", date: "2026-05-06" },
    { name: "🚨 Ústní zkoušky ", date: "2026-05-18"}
];

// Dnešní datum získáme přes zabudovanou funkci moment()
const today = moment().startOf('day');

// Zpracování dat pro tabulku
const tableData = exams.map(exam => {
    const examDate = moment(exam.date);
    const daysLeft = examDate.diff(today, 'days');
    
    let status = "";
    
    // Dynamický text a barvy/emotikony podle toho, kolik dní zbývá
    if (daysLeft > 14) {
        status = `Zbývá ${daysLeft} dní`;
    } else if (daysLeft > 7) {
        status = `Zbývá ${daysLeft} dní`;
    } else if (daysLeft > 0) {
        status = `Zbývá jen ${daysLeft} dní!`;
    } else if (daysLeft === 0) {
        status = "🔥 Dnes!";
    } else {
        status = "✅ Zkouška je za tebou";
    }

    return [exam.name, examDate.format('DD.MM.YYYY'), status];
});

// Vykreslení tabulky
dv.table(["Zkouška", "Datum", "Odpočet"], tableData);