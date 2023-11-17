// Copyright (c) 2023, Usama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Weekly Timesheet', {
	setup: function(frm) {
		frm.fields_dict.employee.get_query = function() {
			return {
				filters:{
					'status': 'Active'
				}
			};
		};

		frm.fields_dict['time_logs'].grid.get_field('project').get_query = function() {
			return{
				filters: {
					'company': frm.doc.company
				}
			};
		};
	},

	onload: function(frm) {
		if (frm.doc.__islocal && frm.doc.time_logs) {
			calculate_total_hrs(frm);
		}
	},

	start_date: function(frm) {
		var startDate = frm.doc.start_date;

		// Check if the Start Date is valid
		if (startDate) {
			// Convert the Start Date to a JavaScript Date object
			startDate = frappe.datetime.str_to_obj(startDate);

			// Add 7 days to the Start Date
			var endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + 6);

			// Format the End Date as a string
			var endDateString = frappe.datetime.obj_to_str(endDate);

			// Set the calculated End Date in the form
			frm.set_value('end_date', endDateString);
		}
	}
});

frappe.ui.form.on("Weekly Timesheet Details", {
	time_logs_remove: function(frm) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	sunday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	monday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	tuesday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	wednesday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	thursday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	friday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

	saturday: function(frm, cdt, cdn) {
		calculate_days_total(frm, cdt, cdn)
		calculate_total_hrs(frm);
	},

});

var calculate_days_total = function(frm, cdt, cdn){
	var child = locals[cdt][cdn];
	let weektotal = 0;
	weektotal = (child.sunday || 0) + (child.monday || 0) + (child.tuesday || 0) + (child.wednesday || 0) + (child.thursday || 0) + (child.friday || 0) + (child.saturday || 0);
	frappe.model.set_value(cdt, cdn, "week_total", weektotal);

};

var calculate_total_hrs = function(frm) {
	let tl = frm.doc.time_logs || [];
	let total_week_hr = 0;
	let total_sunday_hr = 0;
	let total_monday_hr = 0;
	let total_tuesday_hr = 0;
	let total_wednesday_hr = 0;
	let total_thursday_hr = 0;
	let total_friday_hr = 0;
	let total_saturday_hr = 0;
	for(var i=0; i<tl.length; i++) {
		if (tl[i].week_total) {
			total_week_hr += tl[i].week_total;
		}
		if (tl[i].sunday) {
			total_sunday_hr += tl[i].sunday;
		}
		if (tl[i].monday) {
			total_monday_hr += tl[i].monday;
		}
		if (tl[i].tuesday) {
			total_tuesday_hr += tl[i].tuesday;
		}
		if (tl[i].wednesday) {
			total_wednesday_hr += tl[i].wednesday;
		}
		if (tl[i].thursday) {
			total_thursday_hr += tl[i].thursday;
		}
		if (tl[i].friday) {
			total_friday_hr += tl[i].friday;
		}
		if (tl[i].saturday) {
			total_saturday_hr += tl[i].saturday;
		}
	}

	frm.set_value("total_week_hours", total_week_hr);
	frm.set_value("sunday_total", total_sunday_hr);
	frm.set_value("monday_total", total_monday_hr);
	frm.set_value("tuesday_total", total_tuesday_hr);
	frm.set_value("wednesday_total", total_wednesday_hr);
	frm.set_value("thursday_total", total_thursday_hr);
	frm.set_value("friday_total", total_friday_hr);
	frm.set_value("saturday_total", total_saturday_hr);
};
