<%*
let clipboard = await tp.system.clipboard();
// Каждую строку оборачиваем в "> "
let lines = clipboard.split("\n").map(l => `> ${l}`);
tR += lines.join("\n");
%>