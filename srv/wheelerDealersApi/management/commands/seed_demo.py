from decimal import Decimal

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from wheelerDealersApi.models import (
    Car, Company, Drivetrain, EmissionClass, EngineType, Fuel, Model,
    TransmissionType, User,
)


class Command(BaseCommand):
    help = "Create development users and eight cars without images. Run seed_data.sql first."

    @transaction.atomic
    def handle(self, *args, **options):
        def lookup(model, **filters):
            item = model.objects.filter(**filters).order_by("pk").first()
            if item is None:
                raise CommandError(
                    f"Missing {model.__name__}: {filters}. Import seed_data.sql first."
                )
            return item

        manual = lookup(TransmissionType, type="Manual")
        automatic = lookup(TransmissionType, type="Automatic")
        petrol = lookup(Fuel, type="Petrol")
        diesel = lookup(Fuel, type="Diesel")
        fwd = lookup(Drivetrain, type="FWD")
        rwd = lookup(Drivetrain, type="RWD")
        awd = lookup(Drivetrain, type="AWD")
        engine = lookup(EngineType, type="Inline-4")
        emission = lookup(EmissionClass, class_name="Euro 6b")

        company, _ = Company.objects.get_or_create(
            PIB=99000001,
            defaults={"address": "Demo dealership, Belgrade", "phone": "+381600000004"},
        )
        accounts = [
            ("demo_admin", {"is_staff": True, "is_superuser": True}),
            ("demo_buyer", {}),
            ("demo_seller", {}),
            ("demo_reseller", {"is_reseller": True}),
            ("demo_dealer", {"PIB": company}),
        ]
        users = {}
        created_users = 0
        for index, (username, role) in enumerate(accounts):
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    "email": f"{username}@example.com",
                    "phone": f"+38160000000{index}",
                    "address": "Demo address, Belgrade",
                    "is_active": True,
                    **role,
                },
            )
            if created:
                user.set_password("DemoPass123!")
                user.save(update_fields=["password"])
                created_users += 1
            users[username] = user

        # Manufacturer, model, owner, year, hp, cc, gears, price, color, fuel, gearbox, drive.
        listings = [
            ("Volkswagen", "Golf", "demo_seller", 2016, 150, 1968, 6, "10900", "White", diesel, manual, fwd),
            ("Fiat", "500", "demo_seller", 2018, 69, 1242, 5, "8200", "Red", petrol, manual, fwd),
            ("BMW", "3 Series", "demo_reseller", 2017, 190, 1995, 8, "18500", "Black", diesel, automatic, rwd),
            ("Audi", "A4", "demo_reseller", 2018, 190, 1968, 7, "21900", "Silver", diesel, automatic, awd),
            ("Volkswagen", "Passat", "demo_dealer", 2019, 150, 1968, 7, "20500", "Blue", diesel, automatic, fwd),
            ("Toyota", "Corolla", "demo_dealer", 2020, 132, 1598, 6, "16900", "White", petrol, manual, fwd),
            ("Renault", "Clio", "demo_dealer", 2016, 90, 1461, 5, "7500", "Grey", diesel, manual, fwd),
            ("Škoda", "Octavia", "demo_dealer", 2019, 150, 1498, 6, "15900", "Green", petrol, manual, fwd),
        ]
        created_cars = 0
        for index, listing in enumerate(listings, start=1):
            (manufacturer, name, owner, year, hp, cc, gears, price, color,
             fuel, transmission, drive) = listing
            model = lookup(Model, name=name, manufacturer__name=manufacturer)
            _, created = Car.objects.get_or_create(
                chassis_number=f"WDDEMO{index:011d}",
                defaults={
                    "user": users[owner],
                    "model": model,
                    "transmission_type": transmission,
                    "fuel": fuel,
                    "drivetrain": drive,
                    "engine_type": engine,
                    "emission_class": emission,
                    "year": year,
                    "horsepower": hp,
                    "kilowatt": round(hp * 0.7355),
                    "engine_volume": cc,
                    "gears": gears,
                    "doors": 3 if name == "500" else 5,
                    "seats": 4 if name == "500" else 5,
                    "steering_wheel_left": True,
                    "interior_color": "Black",
                    "price": Decimal(price),
                    "exterior_color": color,
                    "is_preowned": True,
                },
            )
            created_cars += int(created)

        self.stdout.write(self.style.SUCCESS(
            f"Created {created_users} users and {created_cars} cars without images. "
            "Existing demo records were left unchanged."
        ))
        self.stdout.write("New demo users share the development password: DemoPass123!")
