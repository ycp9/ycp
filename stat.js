emailjs.init("P8vvSNSgOy7W7Wd9_"); // your EmailJS public key

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("statusMsg");
  status.innerHTML = "Sending...";

  const file = document.getElementById("image").files[0];
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Convert image to base64 for EmailJS
  const base64 = await toBase64(file);

  const params = {
    customer_name: name,
    customer_email: email,
    car_image: base64
  };

  emailjs.send("service_2yx79yg", "template_di7cjv4", params)
    .then(() => {
      status.style.color = "#6aff6a";
      status.innerHTML = "Order sent successfully!";
    })
    .catch(err => {
      status.style.color = "#ff6a6a";
      status.innerHTML = "Failed to send: " + err.text;
    });
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
