
function calc() {
  const l = parseFloat(document.getElementById('lengthFt').value) || 0;
  const w = parseFloat(document.getElementById('widthFt').value) || 0;
  const t = parseFloat(document.getElementById('thicknessIn').value) || 0;
  const waste = parseFloat(document.getElementById('wastePct').value) || 0.10;

  // Volume in cu ft: L * W * (T / 12)
  const cuFt = l * w * (t / 12);
  const cuFtWithWaste = cuFt * (1 + waste);
  const cuYards = cuFtWithWaste / 27;

  // An 80 lb bag yields approx 0.60 cu ft
  // A 60 lb bag yields approx 0.45 cu ft
  // A 50 lb bag yields approx 0.375 cu ft
  const b80 = Math.ceil(cuFtWithWaste / 0.60);
  const b60 = Math.ceil(cuFtWithWaste / 0.45);
  const b50 = Math.ceil(cuFtWithWaste / 0.375);

  document.getElementById('cubicYards').innerText = cuYards.toFixed(2) + ' yd³';
  document.getElementById('bags80').innerText = b80 + ' bags';
  document.getElementById('bags60').innerText = b60 + ' bags';
  document.getElementById('bags50').innerText = b50 + ' bags';

  let verdict = '';
  if (cuYards >= 2.0) {
    verdict = `💡 <strong>Ready-Mix Truck Alert:</strong> For projects requiring <strong>${cuYards.toFixed(2)} cubic yards</strong> (${b80} bags of 80 lbs), mixing by hand in a wheelbarrow or small mixer is grueling labor (~${(b80 * 80).toLocaleString()} lbs of material). Ordering a ready-mix concrete truck delivered to your site is typically cheaper and ensures uniform structural strength.`;
  } else {
    verdict = `✅ <strong>DIY Bag Project:</strong> At <strong>${cuYards.toFixed(2)} cubic yards</strong>, this is a manageable DIY job for a weekend rental mixer. You need <strong>${b80} bags of 80 lb concrete</strong> (or ${b60} of 60 lb) including your 10% waste buffer.`;
  }
  document.getElementById('truckVerdict').innerHTML = verdict;
}

['lengthFt', 'widthFt', 'thicknessIn', 'wastePct'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    if (document.getElementById(id + 'Range')) {
      document.getElementById(id + 'Range').value = document.getElementById(id).value;
    }
    calc();
  });
});

['lengthRange', 'widthRange'].forEach(id => {
  const target = id.replace('Range', 'Ft');
  document.getElementById(id).addEventListener('input', (e) => {
    document.getElementById(target).value = e.target.value;
    calc();
  });
});

calc();
