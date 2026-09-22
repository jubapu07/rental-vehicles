$items = @(
  @{ file="public/images/vehicles/mahindra-thar.jpg"; msg="feat(fleet): add authentic imagery for 2024 Mahindra Thar 4x4" },
  @{ file="public/images/vehicles/toyota-fortuner.jpg"; msg="feat(fleet): add authentic imagery for 2024 Toyota Fortuner Legender" },
  @{ file="public/images/vehicles/mahindra-scorpio-n.jpg"; msg="feat(fleet): add authentic imagery for 2024 Mahindra Scorpio-N 4XPLOR" },
  @{ file="public/images/vehicles/maruti-jimny.jpg"; msg="feat(fleet): add authentic imagery for 2024 Maruti Suzuki Jimny 4x4" },
  @{ file="public/images/vehicles/re-himalayan.jpg"; msg="feat(fleet): add authentic imagery for 2024 Royal Enfield Himalayan 450" },
  @{ file="public/images/vehicles/re-classic-350.jpg"; msg="feat(fleet): add authentic imagery for 2024 Royal Enfield Classic 350" },
  @{ file="public/images/vehicles/ktm-390-duke.jpg"; msg="feat(fleet): add authentic imagery for 2024 KTM 390 Duke" },
  @{ file="public/images/vehicles/toyota-hilux.jpg"; msg="feat(fleet): add authentic imagery for 2024 Toyota Hilux 4x4 AT" },
  @{ file="public/images/vehicles/maruti-swift.jpg"; msg="feat(fleet): add authentic imagery for 2024 Maruti Suzuki Swift ZXi+" },
  @{ file="public/images/vehicles/honda-activa.jpg"; msg="feat(fleet): add authentic imagery for 2024 Honda Activa 6G DLX" },
  @{ file="public/images/vehicles/toyota-innova-hycross.jpg"; msg="feat(fleet): add authentic imagery for 2024 Toyota Innova Hycross ZX(O)" },
  @{ file="public/images/vehicles/hyundai-creta.jpg"; msg="feat(fleet): add authentic imagery for 2024 Hyundai Creta SX(O)" },
  @{ file="public/images/vehicles/mahindra-xuv700.jpg"; msg="feat(fleet): add authentic imagery for 2024 Mahindra XUV700 AX7L" },
  @{ file="public/images/vehicles/tata-nexon-ev.jpg"; msg="feat(fleet): add authentic imagery for 2024 Tata Nexon EV Max" },
  @{ file="public/images/vehicles/tata-safari.jpg"; msg="feat(fleet): add authentic imagery for 2024 Tata Safari Dark Edition" },
  @{ file="public/images/vehicles/skoda-slavia.png"; msg="feat(fleet): add authentic imagery for 2024 Skoda Slavia 1.5 TSI" },
  @{ file="public/images/vehicles/bmw-330li.jpg"; msg="feat(fleet): add authentic imagery for 2024 BMW 330Li M-Sport Gran Limousine" },
  @{ file="public/images/vehicles/bmw-g310-gs.jpg"; msg="feat(fleet): add authentic imagery for 2024 BMW G 310 GS Adventure" },
  @{ file="public/images/vehicles/isuzu-dmax.jpg"; msg="feat(fleet): add authentic imagery for 2024 Isuzu D-Max V-Cross 4x4" },
  @{ file="public/images/vehicles/re-hunter-350.png"; msg="feat(fleet): add authentic imagery for 2024 Royal Enfield Hunter 350" },
  @{ file="public/images/vehicles/triumph-scrambler-400x.jpg"; msg="feat(fleet): add authentic imagery for 2024 Triumph Scrambler 400X" },
  @{ file="public/images/vehicles/mahindra-bolero-camper.jpg"; msg="feat(fleet): add authentic imagery for 2024 Mahindra Bolero Camper 4x4" }
)

foreach ($item in $items) {
  Write-Host "Staging $($item.file)..."
  git add $item.file
  git commit -m $item.msg
}
