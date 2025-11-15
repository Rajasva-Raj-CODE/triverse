"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {ProjectTimelapse} from "@/app/dashboard/timelapse/api/create_timelapse";
import {toast} from "sonner";
import {useState} from "react";
import {Loader2} from "lucide-react";

const projectSchema = z.object({
    start_date: z.string().nonempty("Start date is required"),
    end_date: z.string().nonempty("End date is required"),
    start_time: z.string().nonempty("Start time is required"),
    end_time: z.string().nonempty("End time is required"),
    speed: z.enum(["fast", "medium", "slow"], { message: "Speed is required" }),
    cam_ids: z.array(z.number()).nonempty("At least one camera must be selected"),
});


type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectForm() {

    const cameras = [
        { id: 1, name: "cam1" },
        { id: 2, name: "cam2" },
        { id: 3, name: "cam3" },
    ];


    const [loading, setLoading] = useState(false);

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            speed: "medium",
            cam_ids: [],
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);

        // Format time to HH:mm:ss
        const formattedData = {
            ...data,
            start_time: data.start_time + ":00",
            end_time: data.end_time + ":00",
        };

        try {
            const res = await ProjectTimelapse(formattedData);
            toast.success("✅Project Timelapse Queued", {
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

                            {/* Camera Selection */}
                            <FormField
                                control={form.control}
                                name="cam_ids"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Cameras</FormLabel>
                                        <div className="space-y-2">
                                            {cameras.map((cam) => (
                                                <label key={cam.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={cam.id}
                                                        checked={field.value?.includes(cam.id)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            const value = Number(e.target.value); // ensure it's a number
                                                            if (checked) {
                                                                field.onChange([...field.value, value]);
                                                            } else {
                                                                field.onChange(field.value.filter((v) => v !== value));
                                                            }
                                                        }}
                                                    />
                                                    <span>{cam.name}</span>
                                                </label>
                                            ))}
                                        </div>
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
