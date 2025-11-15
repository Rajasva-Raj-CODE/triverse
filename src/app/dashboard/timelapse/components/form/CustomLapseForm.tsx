'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CustomTimelapse } from "../../api/create_timelapse";

const customLapseSchema = z.object({
    start_date: z.string().nonempty("Start date is required"),
    end_date: z.string().nonempty("End date is required"),
    start_time: z.string().nonempty("Start time is required"),
    end_time: z.string().nonempty("End time is required"),
    cam_id: z.coerce.number({ message: "Camera is required" }),
    resolution: z.coerce.number().min(1, "Resolution is required"),
    speed: z.enum(["fast", "medium", "slow"], { message: "Speed is required" }),
});

type CustomLapseFormData = z.infer<typeof customLapseSchema>;

export const CustomLapseForm = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<CustomLapseFormData>({
        resolver: zodResolver(customLapseSchema),
        defaultValues: {
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            cam_id: 1,
            resolution: undefined,
            speed: "medium",
        },
    });

    const onSubmit = async (data: CustomLapseFormData) => {
        setLoading(true);

        const token = localStorage.getItem('token');
        console.log('Bearer ' + token);

        try {
            const res = await CustomTimelapse(data);
            toast.success("✅ Timelapse Queued", {
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
                <div className="text-2xl font-bold text-center">Create Custom Timelapse</div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Start Date */}
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* End Date */}
                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
};
