// nazivi komponenti pišu se u PascalCase stilu, gde svaka reč počinje velikim slovom
// Razlog: React razlikuje HTML elemente (<div>, <p>) od komponenti (<Header>, <UserCard>)

function Message() {
  return <p>Message</p>;
}
// komponenta je deo korisničkog interfejsa koji se može višestruko koristiti
// u react-u komponenta je obična js funkcija koja vraća JSX
// JSX skracenica za Javascript XML (HTML kod unutar js-a)

export default Message;
// export koristimo da omogućimo da se komponenta koristi u drugim fajlovima
