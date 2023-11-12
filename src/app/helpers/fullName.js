export function fullName(data) {
  const formatName = (name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  };

  const userNames = data.name.split(" ");
  const surNames = data.surname.split(" ");

  const formattedNames = userNames.map(formatName);
  const formattedSurnames = surNames.map(formatName);

  const fullName = formattedNames.join(" ") + " " + formattedSurnames.join(" ");
  return fullName;
}
