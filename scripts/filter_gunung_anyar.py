#!/usr/bin/env python3
"""
Script to filter and optimize GeoJSON data for Kecamatan Gunung Anyar, Surabaya.
Standardizes properties, filters coordinates within Gunung Anyar bounds,
adds category icons and rich metadata, and formats the output cleanly.
"""

import json
import os

# Bounds for Kecamatan Gunung Anyar & surrounding area
LAT_MIN, LAT_MAX = -7.3600, -7.3150
LNG_MIN, LNG_MAX = 112.7650, 112.8350

# POIs to enrich Kecamatan Gunung Anyar area
GUNUNG_ANYAR_POIS = [
    {
        "id": "ga-poi-001",
        "name": "Kantor Kecamatan Gunung Anyar",
        "category": "Pemerintahan",
        "icon": "building-2",
        "address": "Jl. Raya Gunung Anyar No. 2, Surabaya",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Pusat pelayanan administrasi dan pemerintahan Kecamatan Gunung Anyar",
        "lat": -7.3361,
        "lng": 112.7872
    },
    {
        "id": "ga-poi-002",
        "name": "UPN Veteran Jawa Timur",
        "category": "Pendidikan",
        "icon": "graduation-cap",
        "address": "Jl. Raya Rungkut Madya, Gunung Anyar",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Perguruan Tinggi Negeri terkemuka di wilayah Gunung Anyar Surabaya",
        "lat": -7.3335,
        "lng": 112.7885
    },
    {
        "id": "ga-poi-003",
        "name": "Politeknik Pelayaran Surabaya",
        "category": "Pendidikan",
        "icon": "anchor",
        "address": "Jl. Gunung Anyar Boulevard No. 1",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Akademi dan kampus pendidikan vokasi pelayaran kementerian perhubungan",
        "lat": -7.3482,
        "lng": 112.7938
    },
    {
        "id": "ga-poi-004",
        "name": "Wisata Ekowisata Mangrove Gunung Anyar",
        "category": "Wisata & Alam",
        "icon": "trees",
        "address": "Jl. Medokan Sawah Timur, Gunung Anyar Tambak",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Kawasan konservasi mangrove dan tujuan wisata alam pesisir timur Surabaya",
        "lat": -7.3412,
        "lng": 112.8210
    },
    {
        "id": "ga-poi-005",
        "name": "Puri Mas Apartement",
        "category": "Hunian",
        "icon": "building",
        "address": "Jl. I Gusti Ngurah Rai, Gunung Anyar",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Kawasan hunian vertikal dan bisnis Puri Mas",
        "lat": -7.3325,
        "lng": 112.7855
    },
    {
        "id": "ga-poi-006",
        "name": "A&W Puri Mas",
        "category": "Kuliner",
        "icon": "utensils",
        "address": "Jl. Kolonel I Gusti Ngurah Rai, Gunung Anyar",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Restoran siap saji di area komersial Puri Mas",
        "lat": -7.3318,
        "lng": 112.7850
    },
    {
        "id": "ga-poi-007",
        "name": "Puskesmas Gunung Anyar",
        "category": "Kesehatan",
        "icon": "heart-pulse",
        "address": "Jl. Raya Gunung Anyar Sawah No. 8",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Pusat pelayanan kesehatan masyarakat Kecamatan Gunung Anyar",
        "lat": -7.3389,
        "lng": 112.7891
    },
    {
        "id": "ga-poi-008",
        "name": "Pasar Gunung Anyar",
        "category": "Perdagangan",
        "icon": "shopping-bag",
        "address": "Jl. Raya Gunung Anyar Pasaran",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Pasar tradisional dan pusat aktivitas ekonomi warga lokal",
        "lat": -7.3350,
        "lng": 112.7860
    },
    {
        "id": "ga-poi-009",
        "name": "Taman Riviera Gunung Anyar",
        "category": "Fasilitas Umum",
        "icon": "sparkles",
        "address": "Perumahan Riviera, Gunung Anyar",
        "district": "Gunung Anyar",
        "city": "Surabaya",
        "postcode": "60294",
        "description": "Taman terbuka hijau dan area rekreasi keluarga",
        "lat": -7.3395,
        "lng": 112.7940
    }
]

def is_in_gunung_anyar(lat, lng, props):
    # Check bounding box
    if LAT_MIN <= lat <= LAT_MAX and LNG_MIN <= lng <= LNG_MAX:
        return True
    
    # Check text properties
    text_check = json.dumps(props).lower()
    if 'gunung anyar' in text_check or 'puri mas' in text_check or 'ngurah rai' in text_check:
        return True
    
    return False

def filter_and_optimize():
    input_file = 'public/data/surabaya.geojson'
    output_file = 'public/data/gunung_anyar.geojson'
    
    print(f"Reading {input_file}...")
    existing_features = []
    
    if os.path.exists(input_file):
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            features = data.get('features', [])
            for feat in features:
                geom = feat.get('geometry', {})
                props = feat.get('properties', {})
                if geom.get('type') == 'Point':
                    coords = geom.get('coordinates', [])
                    if len(coords) >= 2:
                        lng, lat = coords[0], coords[1]
                        if is_in_gunung_anyar(lat, lng, props):
                            # Standardize properties
                            name = props.get('name') or props.get('tags', {}).get('name') or 'Lokasi Gunung Anyar'
                            amenity = props.get('amenity') or props.get('tags', {}).get('amenity') or ''
                            building = props.get('building') or props.get('tags', {}).get('building') or ''
                            street = props.get('addr:street') or props.get('tags', {}).get('addr:street') or 'Jl. I Gusti Ngurah Rai'
                            
                            category = 'Fasilitas Umum'
                            icon = 'map-pin'
                            if amenity == 'fast_food' or 'food' in amenity:
                                category = 'Kuliner'
                                icon = 'utensils'
                            elif building == 'residential' or 'apartment' in building:
                                category = 'Hunian'
                                icon = 'building'
                            
                            std_feature = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [round(lng, 6), round(lat, 6)]
                                },
                                "properties": {
                                    "id": str(props.get('id', 'osm-' + str(len(existing_features)))),
                                    "name": name,
                                    "category": category,
                                    "icon": icon,
                                    "address": f"{street}, Gunung Anyar, Surabaya",
                                    "district": "Gunung Anyar",
                                    "city": "Surabaya",
                                    "postcode": str(props.get('addr:postcode') or '60294'),
                                    "description": f"Lokasi {name} di wilayah Kecamatan Gunung Anyar",
                                    "amenity": amenity,
                                    "building": building
                                }
                            }
                            existing_features.append(std_feature)

    # Combine with Gunung Anyar POIs
    poi_features = []
    for poi in GUNUNG_ANYAR_POIS:
        poi_features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [round(poi["lng"], 6), round(poi["lat"], 6)]
            },
            "properties": {
                "id": poi["id"],
                "name": poi["name"],
                "category": poi["category"],
                "icon": poi["icon"],
                "address": poi["address"],
                "district": poi["district"],
                "city": poi["city"],
                "postcode": poi["postcode"],
                "description": poi["description"]
            }
        })

    # Avoid duplicate names
    all_features = []
    seen_names = set()
    for feat in poi_features + existing_features:
        name = feat["properties"]["name"]
        if name not in seen_names:
            seen_names.add(name)
            all_features.append(feat)

    output_data = {
        "type": "FeatureCollection",
        "metadata": {
            "title": "Data Spasial Kecamatan Gunung Anyar, Kota Surabaya",
            "district": "Gunung Anyar",
            "city": "Surabaya",
            "province": "Jawa Timur",
            "center": [-7.3361, 112.7872],
            "total_features": len(all_features)
        },
        "features": all_features
    }

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    # Also update surabaya.geojson so it's optimized
    with open(input_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"Filterization & Optimization complete! Saved {len(all_features)} features to {output_file} and {input_file}.")

if __name__ == '__main__':
    filter_and_optimize()
