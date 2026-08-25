"use client";

import { useState } from "react";
import { Button, Input, Modal } from "@heroui/react";
import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

// import { Calendar } from "@gravity-ui/icons";

export function BooknowModal({ property }) {

    const data = property || {
        title: "Cozy Family Apartment",
        location: "Dhanmondi, Dhaka",
        propertyType: "Apartment",
        rentType: "Monthly",
        rent: 22628,
        propertySize: 1526,
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: "https://images.unsplash.com/photo-1494783367193-149034c05e8f",
        description: "A well-maintained property located in a peaceful neighborhood, close to schools, hospitals, and shopping centers. Perfect for individuals or small families seeking comfort and convenience.",
        amenities: ["Air Conditioning", "High-speed Internet", "24/7 Security", "Backup Generator"],
        status: "pending"
    };

    // ---- Controlled state for the fields we need to send ----
    const [userName, setUserName] = useState("Programming-Hero Instructor");
    const [email, setEmail] = useState("admin@gmail.com");
    const [phone, setPhone] = useState("");
    const [bookingDate, setBookingDate] = useState(today(getLocalTimeZone())); // defaults to today
    const [date, setDate] = useState(today(getLocalTimeZone()));

    // Formatted date string (YYYY-MM-DD) that will actually be posted to backend
    const dateString = bookingDate ? bookingDate.toString() : "";

    return (
        <Modal>
            {/* Trigger Button */}
            <Button
                className="w-full bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
                variant="secondary"
            >
                Book Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[520px]">
                        <Modal.CloseTrigger />

                        {/* Header */}
                        <Modal.Header className="flex flex-col items-center text-center gap-1">
                            <Modal.Heading className="text-xl font-semibold">
                                Booking Properties
                            </Modal.Heading>
                            <p className="text-sm text-muted font-normal">
                                Make changes to your profile here. Click save when you're done.
                            </p>
                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* User Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">User Name</label>
                                    <Input
                                        value={userName}
                                        onValueChange={setUserName}
                                        variant="bordered"
                                        radius="md"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onValueChange={setEmail}
                                        variant="bordered"
                                        radius="md"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input
                                        value={phone}
                                        onValueChange={setPhone}
                                        placeholder="017XXXXXXXX"
                                        variant="bordered"
                                        radius="md"
                                    />
                                </div>

                                {/* Date — simple, working DatePicker */}
                                {/* <DatePicker className="" name="date">
                                    <Label>Date</Label>
                                    <DateField.Group fullWidth>
                                        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                        <DateField.Suffix>
                                            <DatePicker.Trigger>
                                                <DatePicker.TriggerIndicator />
                                            </DatePicker.Trigger>
                                        </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                        <Calendar aria-label="Event date">
                                            <Calendar.Header>
                                                <Calendar.YearPickerTrigger>
                                                    <Calendar.YearPickerTriggerHeading />
                                                    <Calendar.YearPickerTriggerIndicator />
                                                </Calendar.YearPickerTrigger>
                                                <Calendar.NavButton slot="previous" />
                                                <Calendar.NavButton slot="next" />
                                            </Calendar.Header>
                                            <Calendar.Grid>
                                                <Calendar.GridHeader>
                                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                </Calendar.GridHeader>
                                                <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                            </Calendar.Grid>
                                            <Calendar.YearPickerGrid>
                                                <Calendar.YearPickerGridBody>
                                                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                </Calendar.YearPickerGridBody>
                                            </Calendar.YearPickerGrid>
                                        </Calendar>
                                    </DatePicker.Popover>
                                </DatePicker> */}

                                <DatePicker
                                    className=""
                                    name="date"
                                    value={date}
                                    onChange={setDate}
                                >
                                    <Label>Date</Label>

                                    <DateField.Group fullWidth>
                                        <DateField.Input>
                                            {(segment) => <DateField.Segment segment={segment} />}
                                        </DateField.Input>

                                        <DateField.Suffix>
                                            <DatePicker.Trigger>
                                                <DatePicker.TriggerIndicator />
                                            </DatePicker.Trigger>
                                        </DateField.Suffix>
                                    </DateField.Group>

                                    <DatePicker.Popover>
                                        <Calendar aria-label="Event date">
                                            <Calendar.Header>
                                                <Calendar.YearPickerTrigger>
                                                    <Calendar.YearPickerTriggerHeading />
                                                    <Calendar.YearPickerTriggerIndicator />
                                                </Calendar.YearPickerTrigger>

                                                <Calendar.NavButton slot="previous" />
                                                <Calendar.NavButton slot="next" />
                                            </Calendar.Header>

                                            <Calendar.Grid>
                                                <Calendar.GridHeader>
                                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                </Calendar.GridHeader>

                                                <Calendar.GridBody>
                                                    {(date) => <Calendar.Cell date={date} />}
                                                </Calendar.GridBody>
                                            </Calendar.Grid>

                                            <Calendar.YearPickerGrid>
                                                <Calendar.YearPickerGridBody>
                                                    {({ year }) => (
                                                        <Calendar.YearPickerCell year={year} />
                                                    )}
                                                </Calendar.YearPickerGridBody>
                                            </Calendar.YearPickerGrid>
                                        </Calendar>
                                    </DatePicker.Popover>
                                </DatePicker>
                            </div>
                        </Modal.Body>

                        {/* Footer */}
                        <Modal.Footer className="justify-end gap-2">
                            <Button variant="bordered" slot="close">
                                Cancel
                            </Button>

                            <form action="/api/payment" method="POST">
                                <input type="hidden" name="price" value={data?.rent} />
                                <input type="hidden" name="title" value={data?.title} />
                                <input type="hidden" name="productId" value={property?._id} />
                                <input type="hidden" name="status" value={data?.status} />

                                {/* newly added fields going to backend */}
                                <input type="hidden" name="userName" value={userName} />
                                <input type="hidden" name="email" value={email} />
                                <input type="hidden" name="phone" value={phone} />
                                <input type="hidden" name="date" value={date} />

                                <section>
                                    <button
                                        type="submit"
                                        role="link"
                                        className="w-full bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
                                    >
                                        Confirm Booking
                                    </button>
                                </section>
                            </form>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}