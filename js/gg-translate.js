google.load('language', '1');
var display_once = 0;
var output_error = '<div class="gg-errors-output error" style="margin:10px;"></div>';
var gg_current_bt = {};
var current_translate = '';
$(function()
{
	// @see gg_language_code declaration in AdminTranslations::displayAutoTranslate() method.
	if (!google.language.isTranslatable(gg_translate['language_code']))
	{
		setErrorMessage('"'+gg_translate['language_code']+'" : '+gg_translate['not_available']);
	}
	else
	{
		$('#content').find('input[type="text"], textarea').each(function()
		{
			$(this).after('<a class="button-translate" title="'+gg_translate['tooltip_title']+'|wait..." ></a>');
		});
		$('.button-translate').mouseover(function()
		{
			gg_current_bt = $(this);
		})
		.click(function(e)
		{
			var field = $(this).prev();
			if (current_translate != '')
			{
				if (field.is('input[type="text"]')) field.val(current_translate);
				if (field.is('textarea')) field.html(current_translate);
			}
		})
		.cluetip({
			splitTitle: '|', // use the invoking element's title attribute to populate the clueTip...
							 // ...and split the contents into separate divs where there is a "|"
			showTitle: true, // hide the clueTip's heading
			positionBy: 'bottomTop',
			dropShadow: false,
			onShow : function(ct, c_inner)
			{
				console.log(gg_current_bt);
				current_translate = '';
				var button = gg_current_bt;
				if (button.parent("td").prev().html())
				{
					google.language.translate(button.parent("td").prev().html(), 'en', gg_translate['language_code'], function(result)
					{
						if (!result.error)
						{
							current_translate = result.translation.replace('&#39;', '\'');
							$('#cluetip-inner').html(current_translate);
						}
						else if (display_once == 0)
						{
							display_once = 1;
							$('#cluetip-inner').html('<span class="error">'+result.error.message+'</span>');
							current_translate = '';
						}
					});
				}
			}
		});
	}
});
function setErrorMessage(string)
{
	$('#content .path_bar').after(output_error);
	$('#content .gg-errors-output:eq(0)').html(string);
}