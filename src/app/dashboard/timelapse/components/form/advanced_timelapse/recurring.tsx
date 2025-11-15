"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel,FormControl, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RecurringTimelapse} from "@/app/dashboard/timelapse/api/create_timelapse";
import {toast} from "sonner";
import {useState} from "react";
import {Loader2} from "lucide-react";

const recurringSchema = z.object({
    start_time: z.string().nonempty("Start time is required"),
    end_time: z.string().nonempty("End time is required"),
    cam_id: z.coerce.number({ message: "Camera is required" }),
    resolution: z.coerce.number().min(1, "Resolution is required"),
    speed: z.enum(["fast", "medium", "slow"], { message: "Speed is required" }),
    time_period: z.enum(["daily", "weekly", "monthly"], { message: "Time Period is required" }),

});

type RecurringFormData = z.infer<typeof recurringSchema>;

export default function RecurringForm() {

    const [loading, setLoading] = useState(false);

    const form = useForm<RecurringFormData>({
        resolver: zodResolver(recurringSchema),
        defaultValues: {
            start_time: "",
            end_time: "",
            cam_id: 1,
            resolution: undefined,
            speed: "medium",
            time_period: "daily",
        },
    });

    const onSubmit = async (data: RecurringFormData) => {
        setLoading(true);
        try {
            const res = await RecurringTimelapse(data);
            toast.success("✅Recurring Timelapse Queued", {
                description: `Task ID: ${res.task_id}`,
            });
        } catch (err) {
            toast.error("❌ Failed to create timelapse", {
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full p-4">
            <div className="w-full border rounded-lg p-6 shadow-md bg-white space-y-6">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Start Time */}
                            <FormField
                                control={form.control}
                                name="start_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* End Time */}
                            <FormField
                                control={form.control}
                                name="end_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Camera ID */}
                            <FormField
                                control={form.control}
                                name="cam_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Camera</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            defaultValue={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select camera" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Cam1</SelectItem>
                                                <SelectItem value="2">Cam2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Resolution */}
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Resolution</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            defaultValue={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select resolution" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="720">SD Video 720</SelectItem>
                                                <SelectItem value="1080">HD Video 1080</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Speed */}
                            <FormField
                                control={form.control}
                                name="speed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Speed</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select speed" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="fast">Fast</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="slow">Slow</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Speed */}
                            <FormField
                                control={form.control}
                                name="time_period"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Time Period</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select speed" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="border-yellow-400 text-yellow-500 hover:bg-yellow-100 font-semibold px-6"
                                onClick={() => form.reset()}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
